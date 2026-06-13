// src/Pages/LoginPage/LoginPage.tsx

import { useState } from "react";

import HeroPanel from "../../components/Auth/login/HeroPanel/HeroPanel";
import LoginForm from "../../components/Auth/login/LoginForm/LoginForm";
import RoleSelector, {
  type Role,
} from "../../components/Auth/login/RoleSelector/RoleSelector";

import "./LoginPage.css";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("client");

  return (
    <main className="login-page">
      <div className="login-page__container">

        {/* ── Left Side / Form ── */}
        <section className="login-page__form-section">

          {/* Logo */}
          <div className="login-page__logo">
            <span className="login-page__logo-dot" />
            <h1>Cleanovy</h1>
          </div>

          {/* Header */}
          <div className="login-page__header">
            <h2 className="login-page__title">
              تسجيل الدخول
            </h2>

            <p className="login-page__subtitle">
              اختر نوع الحساب وسجل دخولك للمتابعة
            </p>
          </div>

          {/* Role Selector */}
          <RoleSelector
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
          />

          {/* Login Form */}
          <LoginForm role={selectedRole} />

        </section>

        {/* ── Right Side / Hero ── */}
        <section className="login-page__hero-section">
          <HeroPanel />
        </section>

      </div>
    </main>
  );
};

export default LoginPage;