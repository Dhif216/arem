import React from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css'; // Reuse Contact page styling

const Privacy: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="contact-page">
      <h1 className="page-heading">
        {currentLang === 'tn' ? 'سياسة الخصوصية' : 'Politique de Confidentialité'}
      </h1>
      
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px', textAlign: currentLang === 'tn' ? 'right' : 'left' }}>
        
        {currentLang === 'tn' ? (
          <>
            <section style={{ marginBottom: 30 }}>
              <h2>1. المعلومات التي نجمعها</h2>
              <p>
                نحن نجمع المعلومات التي تقدمها لنا مباشرة عند تقديم طلب أو ملء نموذج اتصال، بما في ذلك الاسم والعنوان والبريد الإلكتروني ورقم الهاتف.
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>2. ملفات تعريف الارتباط</h2>
              <p>
                نستخدم ملفات تعريف الارتباط (Cookies) وتقنيات التتبع المماثلة لتحسين تجربتك على موقعنا، وفهم كيفية استخدام الزوار لموقعنا، وتخصيص المحتوى.
              </p>
              <p>
                تشمل ملفات تعريف الارتباط التي نستخدمها:
              </p>
              <ul>
                <li><strong>ملفات تعريف الارتباط الضرورية:</strong> مطلوبة لتشغيل الموقع بشكل صحيح</li>
                <li><strong>ملفات تعريف الارتباط التحليلية:</strong> تساعدنا على فهم كيفية استخدام الزوار للموقع (Google Analytics)</li>
              </ul>
              <p>
                يمكنك اختيار قبول أو رفض ملفات تعريف الارتباط عبر شعار الموافقة الذي يظهر عند زيارتك الأولى.
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>3. Google Analytics</h2>
              <p>
                نستخدم Google Analytics لتحليل حركة المرور على الموقع. يتم إخفاء هوية عنوان IP الخاص بك لحماية خصوصيتك.
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>4. استخدام المعلومات</h2>
              <p>
                نستخدم المعلومات التي نجمعها من أجل:
              </p>
              <ul>
                <li>معالجة وتوصيل طلباتك</li>
                <li>الرد على استفساراتك</li>
                <li>تحسين خدماتنا وموقعنا الإلكتروني</li>
                <li>إرسال إشعارات بخصوص الطلبات</li>
              </ul>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>5. مشاركة المعلومات</h2>
              <p>
                لا نبيع أو نشارك أو نؤجر معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية. قد نشارك المعلومات مع مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا (مثل خدمة الاستضافة).
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>6. حقوقك</h2>
              <p>
                يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت عن طريق الاتصال بنا على <a href="tel:+21654477309">+216 54 477 309</a>.
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>7. الاتصال بنا</h2>
              <p>
                إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:
              </p>
              <p>
                <strong>هاتف:</strong> +216 54 477 309<br />
                <strong>العنوان:</strong> Rue Costa rica 5120 11 cite erriadh sousse 4023
              </p>
            </section>
          </>
        ) : (
          <>
            <section style={{ marginBottom: 30 }}>
              <h2>1. Informations que nous collectons</h2>
              <p>
                Nous collectons les informations que vous nous fournissez directement lorsque vous passez une commande ou remplissez un formulaire de contact, notamment votre nom, adresse, e-mail et numéro de téléphone.
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>2. Cookies</h2>
              <p>
                Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience sur notre site, comprendre comment les visiteurs utilisent notre site et personnaliser le contenu.
              </p>
              <p>
                Les cookies que nous utilisons incluent :
              </p>
              <ul>
                <li><strong>Cookies nécessaires :</strong> Requis pour le fonctionnement correct du site</li>
                <li><strong>Cookies analytiques :</strong> Nous aident à comprendre comment les visiteurs utilisent le site (Google Analytics)</li>
              </ul>
              <p>
                Vous pouvez choisir d'accepter ou de refuser les cookies via la bannière de consentement qui apparaît lors de votre première visite.
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>3. Google Analytics</h2>
              <p>
                Nous utilisons Google Analytics pour analyser le trafic du site. Votre adresse IP est anonymisée pour protéger votre vie privée.
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>4. Utilisation des informations</h2>
              <p>
                Nous utilisons les informations collectées pour :
              </p>
              <ul>
                <li>Traiter et livrer vos commandes</li>
                <li>Répondre à vos demandes</li>
                <li>Améliorer nos services et notre site web</li>
                <li>Envoyer des notifications concernant les commandes</li>
              </ul>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>5. Partage des informations</h2>
              <p>
                Nous ne vendons, ne partageons ni ne louons vos informations personnelles à des tiers à des fins marketing. Nous pouvons partager des informations avec des prestataires de services qui nous aident à exploiter notre site (comme l'hébergement).
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>6. Vos droits</h2>
              <p>
                Vous pouvez demander l'accès, la correction ou la suppression de vos données personnelles à tout moment en nous contactant au <a href="tel:+21654477309">+216 54 477 309</a>.
              </p>
            </section>

            <section style={{ marginBottom: 30 }}>
              <h2>7. Nous contacter</h2>
              <p>
                Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter :
              </p>
              <p>
                <strong>Téléphone :</strong> +216 54 477 309<br />
                <strong>Adresse :</strong> Rue Costa rica 5120 11 cite erriadh sousse 4023
              </p>
            </section>
          </>
        )}

        <p style={{ marginTop: 40, fontSize: '0.85rem', color: '#666' }}>
          {currentLang === 'tn' 
            ? 'آخر تحديث: نوفمبر 2025' 
            : 'Dernière mise à jour : Novembre 2025'}
        </p>
      </div>
    </div>
  );
};

export default Privacy;
