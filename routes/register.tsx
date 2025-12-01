/**
 * 注册页面路由
 */

import { Head } from "$fresh/runtime.ts";
import RegisterForm from "../islands/RegisterForm.tsx";
import { getMetaTags } from "../config/tdk.ts";

export default function RegisterPage() {
  const meta = getMetaTags("/register");

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <RegisterForm />
    </>
  );
}
