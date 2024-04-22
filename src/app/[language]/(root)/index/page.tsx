import { Input, Button } from "antd";
import { Link } from "src/navigation";
import type { FC } from "react";

const IndexPage: FC = () => {
	return (
    	<main className="p-6">
    		<Input placeholder="Basic usage" />
    		<Button type="primary">1231</Button>

    		<Link href="/user/login">login</Link>

    		<div className='flex-center w-[120px] h-[100px] bg-slate-50'>1111111</div>
    	</main>
	);
};

export default IndexPage;