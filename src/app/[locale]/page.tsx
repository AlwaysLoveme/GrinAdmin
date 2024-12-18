import { redirect } from "src/i18n/routing";
import { getLocale } from "next-intl/server";

const Index = async () => {
  const locale = await getLocale();
  return redirect({
    href: {
      pathname: "/system/dashboard",
    },
    locale,
  });
};

export default Index;
