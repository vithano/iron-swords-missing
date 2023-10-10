
import dayjs from "dayjs";

const teamId = process.env.VERCEL_TEAM_ID;
const accessToken = process.env.VERCEL_ACCESS_TOKEN;

export const getDeployments = async () => {
    if (!teamId || !accessToken) {
        return null;
    }

    const result = await fetch(
        `https://api.vercel.com/v6/deployments?teamId=${teamId}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
    );

    const {deployments = []} = await result.json();
    return deployments;
}

export const getLastDeploymentTime = async () => {
    try {
        const deployments = await getDeployments();
        const deploymentId = deployments?.[0]?.uid;

        if (!deploymentId) {
            throw new Error('No deployment found');
        }

        const result = await fetch(
            `https://api.vercel.com/v13/deployments/${deploymentId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );

        const {ready} = await result.json()

        const lastDeployedDate = dayjs(ready).format('DD-MM-YYYY');
        const lastDeployedTime = dayjs(ready).format('HH:mm');

        return {lastDeployedTime, lastDeployedDate};
    }
    catch (e) {
        return {lastDeployedTime: null, lastDeployedDate: null};
    }
}