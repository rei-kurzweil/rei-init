export const prerender = false;

import type { Item } from '../../../../../packages/micro-domain/src/item';
import type { User } from '../../../../../packages/micro-domain/src/user';
import { UserRepository } from '../../../../../packages/micro-domain/src/db/repository/UserRepository';
import { ItemRepository } from '../../../../../packages/micro-domain/src/db/repository/ItemRepository';

import Layout from '../../layouts/Layout.astro';
import { Items } from '../../components/Items';
import { Card } from '../../components/Card';


import type { ENV } from '../../env';
import { Hono } from 'hono';
import { usersTable } from '@rei-init/micro-domain/db/schema';

// Create Hono app with generic type for environment bindings
const app = new Hono<{ Bindings: ENV }>();

// parameters
// const user_name = Astro.params.user_name;
// const { env } = (Astro.locals  as any).runtime;

app.get('/:user_name', async (c) => {

    const d1: D1Database = c.env.REI_CAST_XYZ_D1;

    let user: User | null = null;
    let items: Item[] = [];

    const user_name = c.req.param().user_name;

    if (user_name) {
        // Fetch the user

        const userRepo = new UserRepository(d1);
        user = await userRepo.findByUserName(user_name);

        const user_id = user?.id ?? 0;

        console.log("user id ", user_id);

        // Fetch items authored by this user
        const itemRepo = new ItemRepository(d1);
        items = await itemRepo.findAllByFromUserId(user_id, 50);

        console.log("items ", JSON.stringify(items));

        return c.json({
            user_id,
            user,
            items
        })
    }


    return c.json({
        message: "no user found"
    });
});
