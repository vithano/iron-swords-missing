
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc)
dayjs.extend(timezone)

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
        if(process.env.NODE_ENV === 'development') {
            return {lastDeployedTime: '00:00', lastDeployedDate: '01-01-2021'};
        }
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

        const date = dayjs(ready).tz("Asia/Jerusalem");
        const lastDeployedDate = date.format('DD-MM-YYYY');
        const lastDeployedTime = date.format('HH:mm');

        return {lastDeployedTime, lastDeployedDate};
    }
    catch (e) {
        console.error(e);
        return {lastDeployedTime: null, lastDeployedDate: null};
    }
}