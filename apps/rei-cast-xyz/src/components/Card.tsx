export function Card({ title, content }: { title: string; content: string }) {
    return (
        <div className="
            border
            border-gray-300
            rounded-lg
            p-4
        ">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-gray-600">{content}</p>
        </div>
    );
}