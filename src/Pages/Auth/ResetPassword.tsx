
import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import "./ResetPassword.css"

import BackButton from "../../components/Auth/Backbutton"
import PasswordField from "../../components/Auth/Passwordfield"
import PasswordRules from "../../components/Auth/Passwordrules"
import BrandPanel from "../../components/Auth/Brandpanel"
 

// ─── Password rule definitions ────────────────────────────────────────────────
const PASSWORD_RULES = [
  {
    id: "length",
    label: "على الأقل 8 أحرف",
    test: (v: string) => v.length >= 8,
  },
  {
    id: "number",
    label: "يجب أن تحتوي على رقم واحد على الأقل",
    test: (v: string) => /\d/.test(v),
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<{ new?: string; confirm?: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  // الاضافه

const [searchParams] = useSearchParams()
const navigate = useNavigate()
const token = searchParams.get("token")



  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40)
    return () => clearTimeout(t)
  }, [])

  // Evaluate each rule against current password value
  const ruleResults = PASSWORD_RULES.map((r) => ({
    ...r,
    passed: r.test(newPassword),
  }))

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: typeof errors = {}

    if (!newPassword) e.new = "كلمة المرور مطلوبة"
    else if (newPassword.length < 8) e.new = "يجب أن تكون 8 أحرف على الأقل"
    else if (!/\d/.test(newPassword))
      e.new = "يجب أن تحتوي على رقم واحد على الأقل"

    if (!confirmPassword) e.confirm = "تأكيد كلمة المرور مطلوب"
    else if (newPassword !== confirmPassword)
      e.confirm = "كلمتا المرور غير متطابقتين"

    setErrors(e)
    return Object.keys(e).length === 0
  }

  // Re-validate live after first submit attempt
  useEffect(() => {
    if (submitted) validate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword, confirmPassword])

  // function handleSubmit(ev: React.FormEvent) {
  //   ev.preventDefault()
  //   setSubmitted(true)
  //   if (validate()) setTimeout(() => setSuccess(true), 350)
  // }
   async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setSubmitted(true)
    if (!validate()) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: newPassword,
            confirmPassword,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setErrors({ new: data.message || "حدث خطأ، حاول مرة أخرى" })
      }
    } catch {
      setErrors({ new: "حدث خطأ في الاتصال بالسيرفر" })
    }
  }
  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      dir="rtl"
      className="flex min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#fbf8fc", fontFamily: "Tajawal" }}
    >
      {/* ── RIGHT: Form section ───────────────────────────────────────────── */}
      <section className="flex w-full items-center justify-center bg-white px-6 py-10 lg:w-1/2">
        <div
          className="flex w-full flex-col"
          style={{
            maxWidth: 480,
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Mobile-only logo */}
          <div className="anim-fsu d1 mb-8 flex justify-center lg:hidden">
            <span
              style={{
                fontFamily: "Cairo",
                fontSize: 32,
                fontWeight: 700,
                color: "#006b5d",
              }}
            >
              CleaNovy
            </span>
          </div>

          {/* ① Back button */}
          <div className="mb-10">
            <BackButton />
          </div>

          {/* ② Page heading */}
          <div className="anim-fsu d2 mb-7" style={{ textAlign: "right" }}>
            <h1
              className="mb-2"
              style={{
                fontFamily: "Cairo",
                fontSize: 32,
                fontWeight: 700,
                color: "#000719",
                lineHeight: 1.3,
              }}
            >
              إعادة تعيين كلمة المرور
            </h1>
            <p
              style={{
                fontFamily: "Tajawal",
                fontSize: 16,
                color: "#44474d",
                lineHeight: 1.6,
              }}
            >
              أدخل كلمة المرور الجديدة الخاصة بك أدناه.
            </p>
          </div>

          {/* ── Success state ─────────────────────────────────────────────── */}
          {success ? (
            <div className="anim-sp flex flex-col items-center gap-5 py-10">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(0,107,93,0.1)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 48,
                    color: "#006b5d",
                    fontVariationSettings:
                      "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 48",
                  }}
                >
                  check_circle
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "Cairo",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#000719",
                  textAlign: "center",
                }}
              >
                تم تحديث كلمة المرور!
              </h2>
              <p
                style={{
                  fontFamily: "Tajawal",
                  fontSize: 16,
                  color: "#44474d",
                  textAlign: "center",
                }}
              >
                يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.
              </p>

              <button
                style={{
                  fontFamily: "Cairo",
                  fontSize: 18,
                  fontWeight: 700,
                  backgroundColor: "#006b5d",
                  color: "#fff",
                  borderRadius: 9999,
                  padding: "12px 40px",
                  marginTop: 16,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.1s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#005046")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#006b5d")
                }
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.98)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                    onClick={() => navigate("/login")}
              >
                تسجيل الدخول
              </button>
            </div>
          ) : (
            /* ── Form ──────────────────────────────────────────────────────── */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6"
            >
              {/* ③ New password field */}
              <div className="anim-fsu d3">
                <PasswordField
                  id="new_password"
                  label="كلمة المرور الجديدة"
                  value={newPassword}
                  onChange={setNewPassword}
                  error={errors.new}
                />
              </div>

              {/* ④ Confirm password field */}
              <div className="anim-fsu d4">
                <PasswordField
                  id="confirm_password"
                  label="تأكيد كلمة المرور الجديدة"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  error={errors.confirm}
                />
              </div>

              {/* ⑤ Password rules checklist */}
              <PasswordRules rules={ruleResults} />

              {/* ⑥ Submit button */}
              <div className="anim-fsu d6">
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#006b5d",
                    color: "#fff",
                    fontFamily: "Cairo",
                    fontSize: 20,
                    fontWeight: 700,
                    padding: "16px 0",
                    borderRadius: 9999,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(0,107,93,0.2)",
                    transition: "background 0.2s, transform 0.1s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#005046")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#006b5d")
                  }
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.98)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  تحديث كلمة المرور
                </button>
              </div>
            </form>
          )}

          {/* Footer link */}
          {!success && (
            <div
              className="anim-fi d6"
              style={{
                marginTop: 40,
                paddingTop: 24,
                borderTop: "1px solid #c5c6ce",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "Tajawal",
                  fontSize: 14,
                  color: "#44474d",
                }}
              >
                هل تواجه مشكلة؟{" "}
                <a
                  href="#"
                  style={{
                    color: "#006b5d",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.textDecoration =
                      "underline")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.textDecoration =
                      "none")
                  }
                >
                  تواصل مع الدعم الفني
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── LEFT: Branded panel ⑦ ─────────────────────────────────────────── */}
      <BrandPanel />
    </div>
  )
}
