import { Webhook } from 'svix';
import prisma from '../db/prisma.js';

export const handleRegisterWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_C;

  if (!WEBHOOK_SECRET) {
    console.error('Critical Error: CLERK_WEBHOOK_SECRET environment variable is missing.');
    return res.status(500).json({ status: 'error', message: 'Internal server configuration fault.' });
  }

  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ status: 'error', message: 'Missing webhook signature headers.' });
  }

  const payload = req.body.toString();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error(`Cryptographic Verification Failed: ${err.message}`);
    return res.status(400).json({ status: 'error', message: 'Invalid payload signature.' });
  }

  const { id: clerkId, email_addresses, first_name, last_name, image_url } = evt.data;
  const eventType = evt.type;
  const primaryEmail = email_addresses?.[0]?.email_address;

  try {
    switch (eventType) {
      case 'user.created': {
        const newUser = await prisma.user.create({
          data: {
            clerkId,
            email: primaryEmail,
            name: `${first_name || ''} ${last_name || ''}`.trim() || null,
            imageUrl: image_url || null,
          },
        });
        console.log(`[DB Sync] Created User: ${newUser.id}`);
        break;
      }

      case 'user.updated': {
        const updatedUser = await prisma.user.update({
          where: { clerkId },
          data: {
            email: primaryEmail,
            name: `${first_name || ''} ${last_name || ''}`.trim() || null,
            imageUrl: image_url || null,
          },
        });
        console.log(`[DB Sync] Updated User: ${updatedUser.id}`);
        break;
      }

      case 'user.deleted': {
        await prisma.user.delete({
          where: { clerkId },
        });
        console.log(`[DB Sync] Purged User: ${clerkId}`);
        break;
      }

      default:
        console.log(`Unhandled Clerk event type fallback: ${eventType}`);
    }

    return res.status(200).json({ status: 'success', received: true });

  } catch (dbError) {
    console.error(`[DB Execution Error] Mapping event ${eventType} failed:`, dbError);
    return res.status(500).json({ status: 'error', message: 'Data persistence pipeline execution failed.' });
  }
};

export const handleUpdateWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_UPDATE;

  if (!WEBHOOK_SECRET) {
    console.error('Critical Error: CLERK_WEBHOOK_SECRET environment variable is missing.');
    return res.status(500).json({ status: 'error', message: 'Internal server configuration fault.' });
  }

  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ status: 'error', message: 'Missing webhook signature headers.' });
  }

  const payload = req.body.toString();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error(`Cryptographic Verification Failed: ${err.message}`);
    return res.status(400).json({ status: 'error', message: 'Invalid payload signature.' });
  }

  const { id: clerkId, email_addresses, first_name, last_name, image_url } = evt.data;
  const eventType = evt.type;
  const primaryEmail = email_addresses?.[0]?.email_address;

  try {
    switch (eventType) {
      case 'user.updated': {
        const updatedUser = await prisma.user.upsert({
          where: { clerkId },
          update: {
            email: primaryEmail,
            name: `${first_name || ''} ${last_name || ''}`.trim() || null,
            imageUrl: image_url || null,
          },
          create: {
            clerkId,
            email: primaryEmail,
            name: `${first_name || ''} ${last_name || ''}`.trim() || null,
            imageUrl: image_url || null,
          },
        });
        console.log(`[DB Sync] Updated User via Upsert: ${updatedUser.id}`);
        break;
      }

      default:
        console.log(`Unhandled Clerk event type fallback: ${eventType}`);
    }

    return res.status(200).json({ status: 'success', received: true });

  } catch (dbError) {
    console.error(`[DB Execution Error] Mapping event ${eventType} failed:`, dbError);
    return res.status(500).json({ status: 'error', message: 'Data persistence pipeline execution failed.' });
  }
};

export const handleDeleteWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_D;

  if (!WEBHOOK_SECRET) {
    console.error('Critical Error: CLERK_WEBHOOK_SECRET environment variable is missing.');
    return res.status(500).json({ status: 'error', message: 'Internal server configuration fault.' });
  }

  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ status: 'error', message: 'Missing webhook signature headers.' });
  }

  const payload = req.body.toString();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error(`Cryptographic Verification Failed: ${err.message}`);
    return res.status(400).json({ status: 'error', message: 'Invalid payload signature.' });
  }

  const { id: clerkId } = evt.data;
  const eventType = evt.type;

  try {
    switch (eventType) {
      case 'user.deleted': {
        await prisma.user.delete({
          where: { clerkId },
        });
        console.log(`[DB Sync] Purged User: ${clerkId}`);
        break;
      }

      default:
        console.log(`Unhandled Clerk event type fallback: ${eventType}`);
    }

    return res.status(200).json({ status: 'success', received: true });

  } catch (dbError) {
    console.error(`[DB Execution Error] Mapping event ${eventType} failed:`, dbError);
    return res.status(500).json({ status: 'error', message: 'Data persistence pipeline execution failed.' });
  }
};