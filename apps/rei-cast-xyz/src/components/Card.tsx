export function Card(
    { title, content, pinned }: { 
        title: string; 
        content: string; 
        pinned?: boolean 
    }) 
{

    // convert newlines to <br /> for display
    const formattedContent = content.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));

    return (
        <div className="
            rounded-lg
            p-4
            mt-4

            Card
        ">
            {pinned && <div className="text-sm text-yellow-500 font-bold mb-2">📌</div>}
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2">{formattedContent}</p>
        </div>
    );
}