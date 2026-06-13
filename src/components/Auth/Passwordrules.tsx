interface Rule {
  id: string;
  label: string;
  passed: boolean;
}

interface PasswordRulesProps {
  rules: Rule[];
}

export default function PasswordRules({ rules }: PasswordRulesProps) {
  return (
    <div
      className="rounded-xl anim-fsu d5"
      style={{ backgroundColor: "#f5f3f6", padding: 16 }}
    >
      <ul className="flex flex-col gap-2">
        {rules.map((rule) => (
          <li
            key={rule.id}
            className="flex items-center gap-2"
            style={{
              flexDirection: "row-reverse",
              justifyContent: "flex-start",
              color: rule.passed ? "#006b5d" : "#44474d",
              transition: "color 0.3s",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 16,
                fontVariationSettings: rule.passed
                  ? "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 20"
                  : "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 20",
                transition: "font-variation-settings 0.3s",
              }}
            >
              {rule.passed ? "check_circle" : "circle"}
            </span>
            <span style={{ fontFamily: "Tajawal", fontSize: 12 }}>{rule.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}