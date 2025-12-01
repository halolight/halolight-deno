/**
 * 服务条款页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import {
  LegalLayoutContent,
  LegalList,
  LegalSection,
} from "../components/layout/LegalLayoutContent.tsx";

const tableOfContents = [
  { id: "acceptance", title: "接受条款" },
  { id: "services", title: "服务说明" },
  { id: "account", title: "账户管理" },
  { id: "usage", title: "使用规范" },
  { id: "content", title: "用户内容" },
  { id: "ip", title: "知识产权" },
  { id: "payment", title: "付费服务" },
  { id: "termination", title: "终止服务" },
  { id: "disclaimer", title: "免责声明" },
  { id: "liability", title: "责任限制" },
  { id: "dispute", title: "争议解决" },
  { id: "misc", title: "其他条款" },
];

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>服务条款 - HaloLight</title>
        <meta
          name="description"
          content="HaloLight 服务条款，使用本平台前请仔细阅读。"
        />
      </Head>
      <Layout showSidebar={false}>
        <LegalLayoutContent
          title="服务条款"
          subtitle="使用本平台前请仔细阅读以下服务条款"
          lastUpdated="2024年3月1日"
          version="2.0"
          tableOfContents={tableOfContents}
        >
          <LegalSection id="acceptance" title="接受条款">
            <p>
              欢迎使用
              HaloLight（以下简称"本平台"或"我们"）。本服务条款（以下简称"本条款"）构成您与本平台之间具有法律约束力的协议。
            </p>
            <p className="mt-4">
              通过访问或使用本平台，您确认您已阅读、理解并同意受本条款的约束。如果您不同意本条款的任何部分，请勿使用本平台。
            </p>
            <p className="mt-4">
              您必须年满18周岁或在您所在司法管辖区达到法定成年年龄才能使用本平台。如果您代表组织使用本平台，您声明并保证您有权代表该组织接受本条款。
            </p>
          </LegalSection>

          <LegalSection id="services" title="服务说明">
            <p>本平台提供以下服务：</p>
            <LegalList
              items={[
                "企业级管理后台解决方案",
                "数据分析和可视化工具",
                "团队协作和项目管理功能",
                "文件存储和文档管理服务",
                "API接口和开发者工具",
              ]}
            />
            <p className="mt-4">
              我们保留随时修改、暂停或终止任何服务的权利，恕不另行通知。我们不对服务的中断或不可用承担责任。
            </p>
          </LegalSection>

          <LegalSection id="account" title="账户管理">
            <p>使用本平台的部分功能需要注册账户。在注册时，您同意：</p>
            <LegalList
              items={[
                "提供真实、准确、完整的注册信息",
                "及时更新账户信息以保持其准确性",
                "妥善保管您的账户凭证，不与他人分享",
                "对账户下的所有活动承担责任",
                "发现未授权使用时立即通知我们",
              ]}
            />
            <p className="mt-4">
              我们保留因违反本条款而暂停或终止账户的权利。
            </p>
          </LegalSection>

          <LegalSection id="usage" title="使用规范">
            <p>在使用本平台时，您同意不进行以下行为：</p>
            <LegalList
              items={[
                "违反任何适用的法律法规",
                "侵犯他人的知识产权或其他合法权益",
                "上传包含病毒、恶意软件或有害代码的内容",
                "干扰或破坏本平台的正常运行",
                "未经授权访问本平台的系统或数据",
                "冒充他人或虚假陈述您与任何个人或实体的关系",
                "收集或存储其他用户的个人信息",
                "发送垃圾信息、广告或其他未经请求的通信",
                "使用自动化工具大规模访问本平台",
              ]}
            />
          </LegalSection>

          <LegalSection id="content" title="用户内容">
            <p>
              "用户内容"指您通过本平台上传、发布或传输的任何内容，包括但不限于文本、图像、视频、文件等。
            </p>
            <p className="mt-4">您保留对用户内容的所有权利，但您授予我们：</p>
            <LegalList
              items={[
                "非独占、全球性、免版税的许可，以存储、处理和显示您的内容",
                "为提供服务所必需的技术处理权利",
                "在您删除内容后合理期限内保留备份的权利",
              ]}
            />
            <p className="mt-4">
              您声明并保证您的用户内容不违反任何法律或侵犯任何第三方权利。
            </p>
          </LegalSection>

          <LegalSection id="ip" title="知识产权">
            <p>
              本平台及其内容（不包括用户内容）的所有知识产权归我们或我们的许可方所有。这包括但不限于：
            </p>
            <LegalList
              items={[
                "软件、代码和技术",
                "商标、标识和品牌元素",
                "文档、指南和教程",
                "设计、界面和用户体验",
              ]}
            />
            <p className="mt-4">
              未经我们事先书面同意，您不得复制、修改、分发、销售或以其他方式使用本平台的任何内容。
            </p>
          </LegalSection>

          <LegalSection id="payment" title="付费服务">
            <p>部分服务可能需要付费。对于付费服务：</p>
            <LegalList
              items={[
                "价格以订购时显示的价格为准",
                "费用不可退还，除非另有说明",
                "自动续费功能默认开启，您可随时取消",
                "我们保留调整价格的权利，变更将在下一计费周期生效",
                "逾期付款可能导致服务暂停或终止",
              ]}
            />
          </LegalSection>

          <LegalSection id="termination" title="终止服务">
            <p>我们可能在以下情况下暂停或终止您对本平台的访问：</p>
            <LegalList
              items={[
                "您违反本条款的任何规定",
                "您的账户存在安全风险",
                "法律要求我们这样做",
                "我们停止提供相关服务",
              ]}
            />
            <p className="mt-4">
              您也可以随时通过删除账户来终止本条款。终止后，您使用本平台的权利将立即停止。
            </p>
          </LegalSection>

          <LegalSection id="disclaimer" title="免责声明">
            <p>
              本平台按"现状"和"可用"基础提供。在法律允许的最大范围内，我们明确声明不提供任何明示或暗示的保证，包括但不限于：
            </p>
            <LegalList
              items={[
                "服务将不间断、及时、安全或无错误",
                "服务将满足您的所有需求",
                "通过服务获得的结果将准确可靠",
                "服务中的任何错误将被纠正",
              ]}
            />
          </LegalSection>

          <LegalSection id="liability" title="责任限制">
            <p>
              在法律允许的最大范围内，对于因使用或无法使用本平台而产生的任何直接、间接、附带、特殊或后果性损害，我们不承担责任，包括但不限于：
            </p>
            <LegalList
              items={[
                "利润损失",
                "数据丢失",
                "商誉损失",
                "业务中断",
              ]}
            />
            <p className="mt-4">
              我们的总责任不超过您在责任产生前12个月内向我们支付的金额。
            </p>
          </LegalSection>

          <LegalSection id="dispute" title="争议解决">
            <p>
              本条款受中华人民共和国法律管辖。因本条款引起的任何争议，双方应首先尝试友好协商解决。
            </p>
            <p className="mt-4">
              如协商不成，任何一方均可将争议提交至本平台所在地有管辖权的人民法院诉讼解决。
            </p>
          </LegalSection>

          <LegalSection id="misc" title="其他条款">
            <p>
              <strong>
                完整协议：
              </strong>本条款构成您与我们之间关于本平台使用的完整协议，取代之前的所有协议。
            </p>
            <p className="mt-4">
              <strong>
                可分割性：
              </strong>如本条款的任何条款被认定为无效或不可执行，其余条款仍然有效。
            </p>
            <p className="mt-4">
              <strong>
                弃权：
              </strong>我们未能执行本条款的任何权利或规定，不构成对该权利或规定的弃权。
            </p>
            <p className="mt-4">
              <strong>
                转让：
              </strong>未经我们事先书面同意，您不得转让本条款下的任何权利或义务。
            </p>
            <p className="mt-4">
              <strong>
                条款变更：
              </strong>我们保留随时修改本条款的权利。重大变更将通过适当方式通知您。
            </p>
          </LegalSection>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>如有任何疑问，请联系我们：</strong>
              <br />
              电子邮箱：legal@halolight.com
              <br />
              工作时间：周一至周五 9:00-18:00
            </p>
          </div>
        </LegalLayoutContent>
      </Layout>
    </>
  );
}
