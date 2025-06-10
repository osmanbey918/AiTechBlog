"use client";
import React, { useState } from 'react';

// ContactButton Component
const ContactButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-1 border border-neutral-800 cursor-pointer bg-[#1A1A1A] px-5 py-3.5 rounded-md border-solid hover:bg-neutral-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

// SocialButton Component
const SocialButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-2.5 flex-[1_0_0] border border-neutral-800 cursor-pointer bg-[#1A1A1A] px-6 py-3.5 rounded-md border-solid hover:bg-neutral-700 transition-colors ${className}`}
    >
      <span>+</span>
    </button>
  );
};

// ContactSection Component
const ContactSection = ({ title, items = [], children }) => {
  return (
    <section className="flex flex-col items-start gap-[30px] flex-[1_0_0] px-0 py-[60px] max-md:w-full max-md:px-0 max-md:py-10 max-sm:px-0 max-sm:py-[30px]">
      <header>
        <h2 className="self-stretch text-white text-lg font-medium leading-[23.4px] tracking-[-0.54px] max-sm:text-base">
          {title}
        </h2>
      </header>
      
      {items.length > 0 && (
        <div className="flex flex-col items-start gap-2.5 self-stretch">
          {items.map((item, index) => (
            <ContactButton key={index} onClick={item.onClick}>
              <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                {item.text}
              </span>
              <span>+</span>
            </ContactButton>
          ))}
        </div>
      )}
      
      {children}
    </section>
  );
};

// ContactForm Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    agreeToTerms: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="flex flex-col items-start gap-[30px] flex-[1_0_0] self-stretch border-l-neutral-800 pl-[60px] pr-0 py-[60px] border-l border-solid max-md:border-t-neutral-800 max-md:px-0 max-md:py-10 max-md:border-l-[none] max-md:border-t max-md:border-solid max-sm:px-0 max-sm:py-[30px]">
      <form onSubmit={handleSubmit} className="flex flex-col items-start gap-[30px] w-full">
        <div className="flex items-start gap-[50px] self-stretch max-sm:flex-col max-sm:gap-5">
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <label htmlFor="firstName" className="self-stretch text-white text-base font-medium leading-6">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter First Name"
              className="flex-[1_0_0] text-[#666] text-sm font-normal leading-[21px] self-stretch border border-neutral-800 bg-[#1A1A1A] p-4 rounded-md border-solid focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
            />
          </div>
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <label htmlFor="lastName" className="self-stretch text-white text-base font-medium leading-6">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter Last Name"
              className="flex-[1_0_0] text-[#666] text-sm font-normal leading-[21px] self-stretch border border-neutral-800 bg-[#1A1A1A] p-4 rounded-md border-solid focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-start gap-[50px] self-stretch max-sm:flex-col max-sm:gap-5">
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <label htmlFor="email" className="self-stretch text-white text-base font-medium leading-6">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your Email"
              className="flex-[1_0_0] text-[#666] text-sm font-normal leading-[21px] self-stretch border border-neutral-800 bg-[#1A1A1A] p-4 rounded-md border-solid focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
            />
          </div>
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <label htmlFor="phoneNumber" className="self-stretch text-white text-base font-medium leading-6">
              Phone Number
            </label>
            <div className="flex items-center gap-3 self-stretch max-sm:flex-col max-sm:gap-2.5">
              <div className="flex items-center gap-1 border border-neutral-800 bg-[#1A1A1A] px-3 py-2.5 rounded-[7px] border-solid max-sm:self-stretch">
                <span>+</span>
              </div>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter Phone Number"
                className="flex-[1_0_0] text-[#666] text-sm font-normal leading-[21px] border border-neutral-800 bg-[#1A1A1A] p-4 rounded-md border-solid focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 flex-[1_0_0] w-full">
          <label htmlFor="message" className="self-stretch text-white text-base font-medium leading-6">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Enter your Message"
            className="flex-[1_0_0] text-[#666] text-sm font-normal leading-[21px] h-[163px] self-stretch border border-neutral-800 bg-[#1A1A1A] p-4 rounded-md border-solid resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-[70px] self-stretch max-sm:flex-col max-sm:gap-5 max-sm:items-start">
          <div className="flex items-center gap-1.5 flex-[1_0_0] max-sm:flex-col max-sm:items-start max-sm:gap-2.5">
            <input
              id="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              className="w-6 h-6 rounded border border-neutral-800 bg-[#1A1A1A] border-solid accent-[#FFD11A]"
            />
            <label htmlFor="agreeToTerms" className="flex-[1_0_0] text-white text-base font-normal leading-6">
              I agree with Terms of Use and Privacy Policy
            </label>
          </div>
          <button
            type="submit"
            className="text-[#141414] text-sm font-medium leading-6 cursor-pointer bg-[#FFD11A] px-[34px] py-3.5 rounded-lg max-sm:self-stretch hover:bg-[#E6BC00] transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
};

// FAQSection Component
const FAQSection = () => {
  const faqData = [
    {
      question: "What is AI?",
      answer: "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making.",
      isOpen: true
    },
    {
      question: "How can I listen to your podcasts?",
      isOpen: false
    },
    {
      question: "Are your podcasts free to listen to?",
      isOpen: false
    },
    {
      question: "Can I download episodes to listen offline?",
      isOpen: false
    },
    {
      question: "How often do you release new episodes?",
      isOpen: false
    }
  ];

  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="flex flex-col items-start gap-6 flex-[1_0_0] border-l-neutral-800 p-[60px] border-l border-solid max-md:border-t-neutral-800 max-md:px-0 max-md:py-10 max-md:border-l-[none] max-md:border-t max-md:border-solid max-sm:px-0 max-sm:py-[30px]">
      {faqData.map((item, index) => (
        <article
          key={index}
          className={`flex items-start gap-5 self-stretch border border-neutral-800 bg-[#1A1A1A] p-6 rounded-lg border-solid ${!openItems.has(index) ? 'cursor-pointer hover:bg-neutral-700' : ''} transition-colors`}
          onClick={() => !openItems.has(index) && toggleItem(index)}
        >
          <div className="flex flex-col items-start gap-5 flex-[1_0_0] self-stretch">
            <h3 className="self-stretch text-white text-lg font-medium">
              {item.question}
            </h3>
            {openItems.has(index) && item.answer && (
              <>
                <div className="w-full h-px bg-neutral-800" />
                <p className="self-stretch text-[#7E7E81] text-base font-normal leading-6">
                  {item.answer}
                </p>
              </>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleItem(index);
            }}
            className="p-1 hover:bg-neutral-600 rounded transition-colors"
            aria-label={openItems.has(index) ? "Collapse answer" : "Expand answer"}
          >
            <span>+</span>
          </button>
        </article>
      ))}
    </section>
  );
};

// Main Component
const ContactPage = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@ai-podcasts.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+11234567890';
  };

  const handleDirectionsClick = () => {
    window.open('https://maps.google.com/?q=123+AI+Tech+Avenue,+Techville,+54321', '_blank');
  };

  const handleSocialClick = (platform) => {
    console.log(`Opening ${platform}`);
  };

  return (
    <main className="flex w-full flex-col items-end min-h-screen bg-black">
      {/* Contact Information Section */}
      <section className="flex items-start gap-[30px] self-stretch border-b-neutral-800 px-20 py-0 border-b border-solid max-md:flex-col max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
        <ContactSection
          title="General Inquiries"
          items={[
            {
              text: "contact@ai-podcasts.com",
              onClick: handleEmailClick
            },
            {
              text: "+1 (123) 456-7890",
              onClick: handlePhoneClick
            }
          ]}
        />
        
        <div className="w-px h-[282px] bg-neutral-800 max-md:w-full max-md:h-px" />
        
        <ContactSection
          title="Technical Support"
          items={[
            {
              text: "contact@ai-podcasts.com",
              onClick: handleEmailClick
            },
            {
              text: "+1 (123) 456-7890",
              onClick: handlePhoneClick
            }
          ]}
        />
        
        <div className="w-px h-[282px] bg-neutral-800 max-md:w-full max-md:h-px" />
        
        <ContactSection title="Our Office">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <address className="self-stretch text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px] not-italic">
              Address: 123 AI Tech Avenue, Techville, 54321
            </address>
            <ContactButton onClick={handleDirectionsClick}>
              <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                Get Directions
              </span>
              <span>+</span>
            </ContactButton>
          </div>
        </ContactSection>
        
        <div className="w-px h-[282px] bg-neutral-800 max-md:w-full max-md:h-px" />
        
        <ContactSection title="Connect with Us">
          <div className="flex items-start gap-2.5 self-stretch max-sm:flex-col">
            <SocialButton onClick={() => handleSocialClick('Twitter')} />
            <SocialButton onClick={() => handleSocialClick('Medium')} />
            <SocialButton onClick={() => handleSocialClick('LinkedIn')} />
          </div>
        </ContactSection>
      </section>

      {/* Contact Form Section */}
      <section className="flex items-center gap-[60px] self-stretch border-b-neutral-800 px-20 py-0 border-b border-solid max-md:flex-col max-md:gap-10 max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
        <div className="flex w-[412px] flex-col justify-center items-start gap-[30px] max-md:w-full">
          <div className="text-4xl">+</div>
          <header>
            <h1 className="self-stretch text-white text-[44px] font-medium leading-[57.2px] tracking-[-1.32px] max-md:text-4xl max-sm:text-[28px]">
              Get in Touch with AI Podcasts
            </h1>
          </header>
        </div>
        <ContactForm />
      </section>

      {/* FAQ Section */}
      <section className="flex items-center gap-[60px] self-stretch px-20 py-0 max-md:flex-col max-md:gap-10 max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
        <div className="flex w-[413px] flex-col justify-center items-start gap-[30px] max-md:w-full">
          <div className="text-4xl">+</div>
          <div className="flex flex-col justify-center items-start gap-4 self-stretch">
            <header>
              <h2 className="self-stretch text-white text-[28px] font-semibold leading-[42px] tracking-[-0.84px] max-sm:text-2xl">
                Asked question
              </h2>
            </header>
            <p className="self-stretch text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
              If the question is not available on our FAQ section, Feel free to
              contact us personally, we will resolve your respective doubts.
            </p>
          </div>
          <ContactButton>
            <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
              Ask Question
            </span>
            <span>+</span>
          </ContactButton>
        </div>
        <FAQSection />
      </section>
    </main>
  );
};

export default ContactPage;