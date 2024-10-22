"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

import Handsontable from "src/components/Handsontable";
import { message } from "src/components/Toast";
import Page from "src/components/Page";

import type { FC } from "react";

const UserLoginPage: FC = () => {
  const t = useTranslations("menu");

  useEffect(() => {
    message("Welcome to the user login page");
  }, []);
  return (
    <Page>
      <Handsontable<{ text: string }> tableTata={[{ text: "123123" }]} />
      {t("home")}
    </Page>
  );
};

export default UserLoginPage;
