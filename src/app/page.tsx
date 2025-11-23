import GameBoard from '@/components/GameBoard';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p className="font-bold">Testing Mode</p>
        <p>Basic frontend test is running. Backend API may not be available yet.</p>
      </div>
      <GameBoard />
    </div>
  );
}
