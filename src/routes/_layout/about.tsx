import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">О нас</h1>
      <p className="text-lg mb-4">
        Acme Inc. - это инновационная компания, специализирующаяся на разработке
        передовых решений для управления заметками и задачами.
      </p>
      <p className="text-lg mb-4">
        Наша миссия - помочь людям организовать свои мысли и задачи, чтобы
        повысить их продуктивность и качество жизни.
      </p>
      <p className="text-lg mb-4">
        Основанная в 2023 году, наша компания быстро растет и развивается,
        предлагая пользователям удобные и интуитивно понятные инструменты.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Наша команда</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-2">Иван Иванов</h3>
          <p className="text-muted-foreground">Основатель и CEO</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-2">Мария Петрова</h3>
          <p className="text-muted-foreground">CTO</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-2">Алексей Сидоров</h3>
          <p className="text-muted-foreground">Ведущий разработчик</p>
        </div>
      </div>
    </div>
  );
}
