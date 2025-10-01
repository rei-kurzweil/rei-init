import type { User } from "@rei-init/micro-domain";

export function Card(
    { title, content, pinned, user, onClick }: { 
        content: string; 
        pinned?: boolean;
        
        title?: string; 
        user?: User;
        onClick?: () => void;
    }) 
{

    if (user){
        title = "@"+user.name;
    }

    // convert newlines to <br /> for display
    const formattedContent = content.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));

    return (
        <div onClick={() => {
            onClick ? onClick() : null
        }} 
            className="
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