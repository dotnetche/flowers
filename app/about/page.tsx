'use client';

import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Award, Users, Truck } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Heart,
      title: 'Страст към красотата',
      description: 'Всеки букет е създаден с любов и внимание към детайла, за да донесе радост и красота във вашия живот.'
    },
    {
      icon: Award,
      title: 'Високо качество',
      description: 'Използваме само най-качествени изкуствени материали, които запазват красотата си с годините.'
    },
    {
      icon: Users,
      title: 'Доволни клиенти',
      description: 'Над 500 доволни клиенти са избрали нашите букети за своите специални моменти.'
    },
    {
      icon: Truck,
      title: 'Бърза доставка',
      description: 'Доставяме навсякъде в България с грижа и внимание към всеки продукт.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                За Rose Boutique
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Създаваме красиви изкуствени букети от рози, които носят емоция и красота 
                във всеки дом. Нашата мисия е да направим специалните моменти още по-незабравими.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Нашата история
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Rose Boutique започна като малка семейна идея - да създаваме букети, 
                    които запазват красотата си завинаги. Вярваме, че красотата на розите 
                    не трябва да бъде ограничена от времето.
                  </p>
                  <p>
                    С годините се превърнахме в доверен партньор за хиляди клиенти, 
                    които търсят качество, елегантност и неповторим стил. Всеки наш 
                    продукт е внимателно подбран и създаден с мисълта за вашето удовлетворение.
                  </p>
                  <p>
                    Днес предлагаме широка гама от изкуствени букети за всеки повод - 
                    от романтични моменти до официални събития, от абитуриентски балове 
                    до корпоративни подаръци.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Букет за всеки повод❤️.jpg"
                    alt="Rose Boutique букет"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Защо да изберете нас?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ние се отличаваме с качество, стил и грижа за всеки детайл
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Нашите ценности
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Качество</h3>
                <p className="text-gray-600">
                  Всеки продукт преминава строг контрол на качеството, за да гарантираме 
                  дълготрайност и красота.
                </p>
              </div>
              
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Иновация</h3>
                <p className="text-gray-600">
                  Постоянно търсим нови материали и техники, за да предложим 
                  най-модерните решения.
                </p>
              </div>
              
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Грижа</h3>
                <p className="text-gray-600">
                  Отношението ни към всеки клиент е лично и внимателно, защото 
                  вашето удовлетворение е наш приоритет.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-rose-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Готови да създадем нещо красиво заедно?
            </h2>
            <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
              Разгледайте нашия каталог или се свържете с нас за персонализирани решения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-rose-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Разгледай каталога
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-rose-600 transition-colors"
              >
                Свържи се с нас
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}