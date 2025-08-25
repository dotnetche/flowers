'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Благодарим ви за съобщението! Ще се свържем с вас скоро.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефон',
      details: ['+359 888 123 456', '+359 2 123 4567'],
      description: 'Обадете се за консултация'
    },
    {
      icon: Mail,
      title: 'Имейл',
      details: ['info@roseboutique.bg', 'orders@roseboutique.bg'],
      description: 'Пишете ни за въпроси'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      details: ['ул. Цветна 15', 'София 1000, България'],
      description: 'Посетете ни в шоурума'
    },
    {
      icon: Clock,
      title: 'Работно време',
      details: ['Пон-Пет: 9:00 - 18:00', 'Събота: 10:00 - 16:00'],
      description: 'Неделя - почивен ден'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Свържете се с нас
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Имате въпроси или нужда от персонализиран букет? Ние сме тук, за да ви помогнем!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Информация за контакт
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                      <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-rose-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Бързи действия</h3>
              <div className="space-y-3">
                <a
                  href="tel:+359888123456"
                  className="flex items-center space-x-3 text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Обадете се сега</span>
                </a>
                <a
                  href="mailto:info@roseboutique.bg"
                  className="flex items-center space-x-3 text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Изпратете имейл</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Изпратете ни съобщение
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Име *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                      placeholder="Вашето име"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Имейл *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                      placeholder="+359 888 123 456"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Тема *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                    >
                      <option value="">Изберете тема</option>
                      <option value="general">Общ въпрос</option>
                      <option value="order">Поръчка</option>
                      <option value="custom">Персонализиран букет</option>
                      <option value="complaint">Оплакване</option>
                      <option value="partnership">Партньорство</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Съобщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors resize-none"
                    placeholder="Опишете вашето запитване или нужда..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Съгласен/на съм с обработката на личните ми данни съгласно 
                    <a href="#" className="text-rose-600 hover:text-rose-700 ml-1">
                      политиката за поверителност
                    </a>
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send className="w-5 h-5 mr-2" />
                  Изпрати съобщение
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Често задавани въпроси
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Колко време отнема доставката?</h3>
                <p className="text-gray-600 text-sm">
                  Стандартната доставка отнема 1-2 работни дни в София и 2-3 работни дни в страната.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Мога ли да върна продукт?</h3>
                <p className="text-gray-600 text-sm">
                  Да, имате право на връщане в рамките на 14 дни при запазена оригинална опаковка.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Правите ли персонализирани букети?</h3>
                <p className="text-gray-600 text-sm">
                  Да, създаваме уникални букети според вашите предпочитания и повод.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Какви са начините за плащане?</h3>
                <p className="text-gray-600 text-sm">
                  Приемаме банкови карти, банков превод и плащане при доставка.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}