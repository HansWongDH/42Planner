import callAPI from "@/app/libs/CallApi";
import { useAccessToken } from "@/app/libs/stores/useSessionStore";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface EstimatedTimeTakenProps{
	project_id: number | undefined;
	inProgress: boolean | null;
}
export default function EstimatedTimeTaken({project_id, inProgress}: EstimatedTimeTakenProps) {
	const accessToken = useAccessToken();
	const [estimatedTime, setEstimatedTime] = useState(0);
	useEffect(() =>{
		async function fetchData()
		{
		   if (!accessToken || !project_id || inProgress != true) return;
		  const info = await callAPI("GET", `projects/${project_id}`, accessToken);
		  const estTime = (info.body.project_sessions[0].estimate_time).match(/\d+/);
		  if (estTime)
			setEstimatedTime(parseInt(estTime[0], 10));
		}
		fetchData();
	}, [])

	return (<Box>Estimated Time to complete : {estimatedTime}</Box>)
}