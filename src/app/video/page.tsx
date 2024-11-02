import VideoCall from '@/components/VideoCall';

const VideoPage = () => {
    const roomId = "test-room";

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Video Call Room</h1>
            <VideoCall roomId={roomId} />
        </div>
    );
};

export default VideoPage;
