export default function MessageRewriter() {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow">
      <h3 className="text-xl font-semibold mb-2">Message Rewriter</h3>
      <p className="text-sm mb-2">Rewrite messages to avoid spam detection.</p>
      <button className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded">
        Rewrite Message
      </button>
    </div>
  );
}
