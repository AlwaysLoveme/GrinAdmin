import MainLayout from "src/components/Layout";
import type { FC, PropsWithChildren } from "react";


const IndexLayout: FC<PropsWithChildren> = ({ children }) => {
	return <MainLayout>{children}</MainLayout>;
};

export default IndexLayout;