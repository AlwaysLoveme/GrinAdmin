import RootLayout from "src/components/Layout";
import type { FC, PropsWithChildren } from "react";


const IndexLayout: FC<PropsWithChildren> = ({ children }) => {
	return <RootLayout>{children}</RootLayout>;
};

export default IndexLayout;