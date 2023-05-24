import Container from '../../components/container'
import ContactForm from '../../components/tr/contactform'
import Layout from '../../components/tr/layout'
import Head from 'next/head'

export default function Team() {
  return (
    <>
      <Layout>
        <Head>
          <title>GroupMFH</title>
        </Head>
        <Container>
          <section className="flex-col flex items-center md:justify-between pt-6 pb-6">
            <h2 className="mb-6 text-5xl md:text-5xl font-bold tracking-tighter leading-tight">
              Ekibimiz
            </h2>
            <h4 className="text-left text-md md:pl-8">
              MFH Group olarak, müşterilerimize en iyi hizmeti sunabilmek için uzmanlaşmış bir ekip ile çalışıyoruz. İşbirliği ve takım ruhuyla çalışarak, çeşitli alanlardaki uzmanlıklarımızı bir araya getiriyor ve müşterilerimizin beklentilerini aşmayı hedefliyoruz.<br/>
              MFH Group ekibi, sektörün önde gelen profesyonellerinden oluşmaktadır. Her bir üye, kendi alanında uzmanlaşmış ve müşterilerimize en iyi hizmeti sunabilmek için gerekli bilgi ve becerilere sahiptir. Çeşitli disiplinlerden gelen deneyimlerimizi bir araya getirerek, kapsamlı çözümler sunmak için birlikte çalışıyoruz.<br/>
              Birlikte çalıştığımız ekibimizin en üst düzeyde performans göstermesi için eğitim ve gelişim fırsatları sunmaktayız. İşimizi tutkuyla yapmanın yanı sıra, müşteri odaklılığımız ve etik değerlere bağlılığımız da bizi öne çıkaran faktörlerdir. Her bir ekibimiz üyesi, MFH Group'un değerlerini benimsemekte ve müşteri memnuniyetini en ön planda tutmaktadır.<br/>
              Ekibimiz, sorumluluk, doğruluk, tarafsızlık, güvenilirlik, yeterlilik ve özen gibi temel ilkelerimize sıkı sıkıya bağlıdır. Her bir projede ve görevde bu değerlere uygun şekilde hareket ederek, müşterilerimize güvenilir ve kaliteli hizmet sunmaktayız.<br/>
              Bizler, MFH Group ekibi olarak, müşterilerimizin başarısına odaklanıyoruz. Sizinle birlikte çalışmayı ve ortak hedeflere ulaşmayı sabırsızlıkla bekliyoruz. Ekibimiz hakkında daha fazla bilgi edinmek veya bize ulaşmak için lütfen bizimle iletişime geçin.<br/>
            </h4>
          </section>
          <ContactForm />
        </Container>
      </Layout>
    </>
  )
}
