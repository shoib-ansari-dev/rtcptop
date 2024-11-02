"use client"
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const VideoCall = ({ roomId }: { roomId: string }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const socketRef = useRef(io());

    useEffect(() => {
        socketRef.current.emit('join', roomId);

        socketRef.current.on('signal', async (data) => {
            if (data.signal) {
                if (data.signal.sdp) {
                    await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.signal));
                    if (data.signal.type === 'offer') {
                        const answer = await peerConnectionRef.current?.createAnswer();
                        await peerConnectionRef.current?.setLocalDescription(answer);
                        socketRef.current.emit('signal', { roomId, signal: answer });
                    }
                } else {
                    peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(data.signal));
                }
            }
        });

        peerConnectionRef.current = new RTCPeerConnection();
        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('signal', { roomId, signal: event.candidate });
            }
        };

        peerConnectionRef.current.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current!.srcObject = stream;
                stream.getTracks().forEach((track) => peerConnectionRef.current?.addTrack(track, stream));
            });

        return () => {
            socketRef.current.disconnect();
            peerConnectionRef.current?.close();
        };
    }, [roomId]);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
        </div>
    );
};

export default VideoCall;
