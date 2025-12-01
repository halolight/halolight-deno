/**
 * 隐私政策页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import {
  LegalLayoutContent,
  LegalList,
  LegalSection,
} from "../components/layout/LegalLayoutContent.tsx";

const tableOfContents = [
  { id: "intro", title: "概述" },
  { id: "collection", title: "信息收集" },
  { id: "usage", title: "信息使用" },
  { id: "sharing", title: "信息共享" },
  { id: "storage", title: "信息存储" },
  { id: "protection", title: "信息保护" },
  { id: "rights", title: "您的权利" },
  { id: "cookies", title: "Cookie 政策" },
  { id: "updates", title: "政策更新" },
  { id: "contact", title: "联系我们" },
];

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>隐私政策 - HaloLight</title>
        <meta
          name="description"
          content="HaloLight 隐私政策，了解我们如何收集、使用和保护您的个人信息。"
        />
      </Head>
      <Layout showSidebar={false}>
        <LegalLayoutContent
          title="隐私政策"
          subtitle="我们重视您的隐私，致力于保护您的个人信息安全"
          lastUpdated="2024年3月1日"
          version="2.0"
          tableOfContents={tableOfContents}
        >
          <LegalSection id="intro" title="概述">
            <p>
              欢迎使用
              HaloLight（以下简称"本平台"或"我们"）。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息，以及您享有的相关权利。
            </p>
            <p>
              请您在使用本平台服务前仔细阅读本政策。如果您不同意本政策的任何内容，您应立即停止使用本平台服务。继续使用本平台服务将被视为您接受本政策的全部内容。
            </p>
          </LegalSection>

          <LegalSection id="collection" title="信息收集">
            <p>我们可能收集以下类型的信息：</p>
            <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
              1. 您主动提供的信息
            </h4>
            <LegalList
              items={[
                "账户信息：如用户名、电子邮箱、密码等",
                "个人资料：如姓名、头像、联系方式等",
                "交易信息：如支付记录、订单信息等",
                "反馈信息：如您提交的意见、建议或投诉",
              ]}
            />
            <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
              2. 自动收集的信息
            </h4>
            <LegalList
              items={[
                "设备信息：设备型号、操作系统、唯一设备标识符",
                "日志信息：访问时间、浏览页面、搜索记录",
                "位置信息：基于IP地址的大致地理位置",
                "Cookie和类似技术收集的信息",
              ]}
            />
          </LegalSection>

          <LegalSection id="usage" title="信息使用">
            <p>我们使用收集的信息用于以下目的：</p>
            <LegalList
              items={[
                "提供、维护和改进我们的服务",
                "处理您的请求和交易",
                "发送服务通知和更新信息",
                "个性化您的使用体验",
                "进行数据分析和研究",
                "防止欺诈和保障安全",
                "遵守法律法规要求",
              ]}
            />
          </LegalSection>

          <LegalSection id="sharing" title="信息共享">
            <p>除以下情况外，我们不会与第三方共享您的个人信息：</p>
            <LegalList
              items={[
                "获得您的明确同意",
                "法律法规要求或政府机关依法要求",
                "与我们的关联公司共享（在本政策目的范围内）",
                "与授权合作伙伴共享（如支付服务商）",
                "学术研究目的（经匿名化处理）",
                "保护我们或他人的合法权益",
              ]}
            />
          </LegalSection>

          <LegalSection id="storage" title="信息存储">
            <p>
              您的信息将存储在位于中华人民共和国境内的服务器上。我们会采取合理的安全措施保护您的信息，存储期限为提供服务所必需的时间，或法律法规要求的保留期限。
            </p>
            <p className="mt-4">
              当您删除账户或信息保留期限届满后，我们将在合理期限内删除或匿名化处理您的个人信息，除非法律法规另有规定。
            </p>
          </LegalSection>

          <LegalSection id="protection" title="信息保护">
            <p>我们采取多种安全措施保护您的信息：</p>
            <LegalList
              items={[
                "数据传输加密（SSL/TLS）",
                "数据存储加密",
                "访问控制和身份验证",
                "定期安全审计和漏洞扫描",
                "员工安全培训和保密协议",
                "安全事件应急响应机制",
              ]}
            />
          </LegalSection>

          <LegalSection id="rights" title="您的权利">
            <p>您对您的个人信息享有以下权利：</p>
            <LegalList
              items={[
                "访问权：查看我们持有的您的个人信息",
                "更正权：更正不准确的个人信息",
                "删除权：要求删除您的个人信息",
                "限制处理权：限制对您信息的处理",
                "数据携带权：获取可机读格式的个人信息",
                "撤回同意权：撤回之前给予的同意",
                "投诉权：向监管机构提出投诉",
              ]}
            />
          </LegalSection>

          <LegalSection id="cookies" title="Cookie 政策">
            <p>我们使用Cookie和类似技术来：</p>
            <LegalList
              items={[
                "记住您的偏好设置",
                "实现自动登录功能",
                "分析网站流量和使用情况",
                "提供个性化内容和广告",
              ]}
            />
            <p className="mt-4">
              您可以通过浏览器设置管理Cookie。请注意，禁用Cookie可能影响部分功能的正常使用。
            </p>
          </LegalSection>

          <LegalSection id="updates" title="政策更新">
            <p>
              我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，重大变更时我们会通过站内通知或电子邮件方式通知您。
            </p>
            <p className="mt-4">
              建议您定期查阅本政策以了解最新变化。继续使用我们的服务将视为您接受更新后的政策。
            </p>
          </LegalSection>

          <LegalSection id="contact" title="联系我们">
            <p>如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：</p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p>
                <strong>电子邮箱：</strong>privacy@halolight.com
              </p>
              <p className="mt-2">
                <strong>邮寄地址：</strong>北京市朝阳区xxx路xxx号
              </p>
              <p className="mt-2">
                <strong>工作时间：</strong>周一至周五 9:00-18:00
              </p>
            </div>
          </LegalSection>
        </LegalLayoutContent>
      </Layout>
    </>
  );
}
