import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white px-6 py-16 text-gray-800">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-orange-600 animate__animated animate__fadeInDown">
          🇮🇳 About the Creator
        </h1>

        {/* Personal Intro */}
        <section className="mb-12">
          <p className="text-lg leading-8 text-justify">
            Hi, I’m <span className="font-bold text-orange-700">Bharat Khandelwal</span>.  
            I have completed my <span className="font-semibold">B.Tech in Computer Science</span>.  
            Alongside preparing for competitive examinations, I have been actively exploring job opportunities in the tech field.  
            My passion lies in using technology not just for innovation, but for building something meaningful that directly benefits our nation and its people.
          </p>
        </section>

        {/* Inspiration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">💡 The Spark Behind the Idea</h2>
          <p className="text-lg leading-8 text-justify">
            One ordinary day, I received a notification about my TV recharge. Around the same time, 
            I saw a social media post mentioning that <span className="font-semibold">ISRO received a budget of ₹13,000 crore this year</span>.  
            I had seen the movie <span className="italic">Mission Mangal</span>, which portrayed how our scientists had to struggle 
            with limited resources to achieve something extraordinary.
          </p>
          <p className="text-lg leading-8 mt-4 text-justify">
            That made me think — why wait for the government’s budget allocations alone?  
            Why can’t we, as Indians, directly contribute to our defence forces and scientists?  
            With over <span className="font-semibold">1 billion bank account holders</span> in India,  
            if every citizen contributed even a small monthly subscription, we could create a massive fund 
            that goes <span className="font-bold">directly</span> to organisations like ISRO and our Armed Forces — 
            without any financial constraints and without any delays.
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">🎯 Vision & Mission</h2>
          <p className="text-lg leading-8 text-justify">
            Our vision is simple — to ensure that no Indian scientist or soldier ever has to halt their work due to lack of funds.  
            Our mission is to build a <span className="font-bold">subscription-based support model</span> that every Indian can be proud of.  
            We already spend hundreds and thousands on OTT platforms every year — why not dedicate even ₹5 a month 
            towards our nation’s progress? It’s affordable, impactful, and patriotic.
          </p>
        </section>

        {/* Why Golden Bird */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">🕊 Why "Golden Bird"?</h2>
          <p className="text-lg leading-8 text-justify">
            India was once called <span className="italic">“Sone Ki Chidiya”</span> — The Golden Bird — 
            because of its immense wealth, cultural richness, and global influence.  
            The name <span className="font-bold">Golden Bird</span> is a tribute to that glorious history, 
            and a promise to work towards restoring India’s strength, self-reliance, and pride.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center py-10 bg-orange-100 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">🇮🇳 Join the Mission</h2>
          <p className="text-lg mb-6">
            Let’s make it a tradition — just like paying for entertainment subscriptions,  
            we subscribe to our nation’s future.  
            Together, we can ensure that India’s brightest minds and bravest hearts  
            always have the resources they need.
          </p>
          <a
            href="/plans"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300"
          >
            🚀 Subscribe Now
          </a>
        </section>

      </div>
    </div>
  );
}

