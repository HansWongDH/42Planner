import { Button } from "flowbite-react";
import callAPI from "../libs/CallApi";
import { useAccessToken } from "../libs/stores/useSessionStore";

export default function ExampleApiCall() {
	const accessToken = useAccessToken()
	async function callandPrint(){
		if (!accessToken) return;
		const data = await callAPI("GET", "me", accessToken)
		console.log(data);
	}
	return (
		<Button gradientDuoTone="purpleToBlue" onClick={callandPrint}>CLICK TO CALL AND PRINT</Button>
	)
}