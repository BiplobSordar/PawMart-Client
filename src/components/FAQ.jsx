import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Shield,
  Truck,
  CreditCard,
} from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I list my pet for adoption?",
      answer:
        "To list a pet for adoption, navigate to your dashboard and click 'Add Listing'. Provide details about your pet, upload photos, and set your preferences. Our team reviews each listing within 24 hours.",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, MasterCard, American Express, PayPal, Google Pay, Apple Pay, and secure bank transfers. All transactions are encrypted.",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      question: "How can I contact a seller?",
      answer:
        "Click the 'Contact Seller' button on any listing page to send a secure message while protecting your privacy.",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      question: "What safety measures are in place?",
      answer:
        "We verify users, review listings manually, provide secure messaging, and offer 24/7 support.",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      question: "Can I return a pet I adopted?",
      answer:
        "We offer a 7-day trial period. If there are issues, contact support immediately.",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      question: "Are shipping services available?",
      answer:
        "Yes! We partner with certified pet transport services following strict welfare standards.",
      icon: <Truck className="h-5 w-5" />,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 py-16">
     
      <div className="text-center mb-14">
        <div className="inline-flex p-3 rounded-full mb-6 bg-[color:var(--accent)/20]">
          <MessageCircle className="h-10 w-10 text-[color:var(--primary)]" />
        </div>

        <h2 className="text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>

        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Get answers to common questions about pet adoption and services
        </p>
      </div>

      
      <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="card border transition-all hover:border-[color:var(--primary)/40]"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-start justify-between text-left gap-4"
            >
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[color:var(--primary)/10] text-[color:var(--primary)]">
                  {faq.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {faq.question}
                  </h3>
                </div>
              </div>

              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-[color:var(--accent)]">
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </button>

           
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 mt-4" : "max-h-0"
              }`}
            >
              <div className="pl-16 border-l-2 border-[color:var(--accent)]">
                <p className="opacity-80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    
      <div className="mt-16 text-center">
        <p className="text-lg font-medium mb-6">
          Still have questions? We're here to help.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => (window.location.href = "/contact")}>
            <MessageCircle className="h-5 w-5 mr-2 inline" />
            Contact Support
          </button>

          <button
            className="bg-transparent border-2 border-[color:var(--primary)] text-[color:var(--primary)] hover:text-[color:var(--text)]"
            onClick={() => (window.location.href = "#")}
          >
            View All FAQs
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
