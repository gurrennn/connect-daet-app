export default function Card({ children, title }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 mb-4">
      {title && <h2 className="text-xl font-bold mb-3 text-gray-800">{title}</h2>}
      {children}
    </div>
  );
}
