import { Redirect } from "expo-router";

export default function Index() {

  const test = true
  
  return (
    <Redirect href='/today'/>
  );
}
