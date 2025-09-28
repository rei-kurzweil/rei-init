import { Card } from "./Card";

export const HardCodedBlogDemo = () => { 

    return (
        <>
            <Card title="@rei-cast.xyz" 
                pinned={true}
                content={
`Welcome to the blog of Rei Evans.

This is where i write words for 0 or more people to read.
            
You are now aware that you are breathing manually.`
            } />

            <Card title="@rei-cast.xyz" content={
`Hit em' with a hard coded blog demo.

Post like a hardened criminal,
pushin' code from my terminal.`
            } />

            <Card title="@rei-cast.xyz" content={
`So, i think it would be kind of cool, if this wasn't hard coded, and instead used a database.
                
We're going figure out a novel way of doing that, that's also simple and eloquent.`
            } />

            <Card title="@rei-cast.xyz" content={
`2/2

It would also be good to display these from most recent to least recent 🙃`
            } />
        </>
    )
};