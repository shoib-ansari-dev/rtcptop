import Link from "next/link";

export default function Home() {
  return (
      <div style={{textAlign: 'center', padding: '2rem'}}>
        <h1>Welcome to the P2P Video Call Application</h1>
        <p>This app allows you to make peer-to-peer video calls using WebRTC.</p>

        <Link href="/video">
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#0070f3',
            color: '#ffffff'
          }}>
            Start Video Call
          </button>
        </Link>
      </div>
  );
}
