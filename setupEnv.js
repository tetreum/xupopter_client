import fs from 'fs';
import crypto from 'crypto';
import { exec } from 'child_process';

const createEnv = async (envPath) => {
    console.log("[Xupopter] Creating .env file");

    const hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');

    let env = [
        `JWT_ACCESS_SECRET="${hash}"`
    ];
    env = env.join("\n");
    await fs.promises.writeFile(envPath, env);
};

const createDB = async () => {
    return new Promise(function(resolve, reject) {
        console.log("[Xupopter] Creating DB");

        exec("prisma db push", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(stdout);
            resolve();
        });
    });
};


/**
 * Creates .env file if it doesn't exist
 */
export const setupEnv = () => ({
    name: 'setup-env',
    async configureServer(server) {
        const envPath = "./config/.env";
        try {
            await fs.promises.access(envPath);
        } catch (e) {
            await createEnv(envPath);
            await createDB();
            server.restart();
        }
    },
  })