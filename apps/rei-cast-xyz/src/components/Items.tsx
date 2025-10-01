import type { Item, User } from "@rei-init/micro-domain";
import { Card } from "./Card";

export function Items({ items, user }: { items: Item[], user?: User }) {
    return (
        <ul>
            {items.map((item) => (
                <Card key={item.id} content={item.content} user={user} 
                    onClick={() => {
                        if (!user) return;

                        const url = '/'+user.name+'/'+item.id;
                        window.location.href = url;
                    }}/>
            ))}
        </ul>
    );
}