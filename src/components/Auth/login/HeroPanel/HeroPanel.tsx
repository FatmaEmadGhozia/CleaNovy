// src/components/login/HeroPanel/HeroPanel.tsx

import "./HeroPanel.css";

const HeroPanel = () => {
  return (
    <div className="hero-panel">
      {/* Background */}
      <div className="hero-panel__bg">
        <img
          src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=900&q=85"
          alt=""
          aria-hidden="true"
          className="hero-panel__bg-img"
        />
      </div>

      {/* Gradient overlay */}
      <div className="hero-panel__overlay" aria-hidden="true" />

      {/* Decorative orb */}
      <div className="hero-panel__orb" aria-hidden="true" />

      {/* Content */}
      <div className="hero-panel__content">
        <h2 className="hero-panel__brand">Cleanovy</h2>
        <p className="hero-panel__title">
          شريكك الذكي في خدمات الغسيل المتطوّرة
        </p>
        <p className="hero-panel__desc">
          انضم إلى آلاف المستخدمين وأصحاب المغاسل في أكبر شبكة لخدمات
          الغسيل الرقمية في المنطقة.
        </p>
      </div>

      {/* Copyright */}
      <p className="hero-panel__copyright" aria-label="حقوق النشر">
         © 2024 · نظام Cleanovy الذكي · جميع الحقوق محفوظة
      </p>
    </div>
  );
};

export default HeroPanel;