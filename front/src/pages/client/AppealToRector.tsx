import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Mail, User, Phone, MapPin, MessageSquare, Send } from "lucide-react";

const ContactForm = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
      fatherName: "",
      faculty: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t("Ad və Soyad tələb olunur"))
        .min(3, t("Ad və Soyad ən azı 3 simvoldan ibarət olmalıdır")),
      fatherName: Yup.string().required(t("Atanızın adı tələb olunur")),
      faculty: Yup.string().required(t("Fakültə tələb olunur")),
      email: Yup.string()
        .email(t("Email düzgün deyil"))
        .required(t("Email tələb olunur")),
      phone: Yup.string()
        .required(t("Telefon nömrəsi tələb olunur"))
        .matches(
          /^[0-9]+$/,
          t("Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır")
        ),
      subject: Yup.string().required(t("Mövzu seçilməlidir")),
      message: Yup.string()
        .required(t("Müraciət yazılmalıdır"))
        .min(10, t("Müraciət ən azı 10 simvoldan ibarət olmalıdır")),
    }),
    onSubmit: (_, { resetForm }) => {
      toast(t("Müraciətiniz qeydə alındı"));
      resetForm();
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0D1F4F] via-[#1a2d5f] to-[#2d4478] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">{t("Əlaqə")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("Rektora Müraciət")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("Suallarınız və təklifləriniz üçün bizimlə əlaqə saxlayın")}
            </p>
          </AnimatedSection>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
              {/* Introduction */}
              <div className="mb-8 p-6 bg-blue-50 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  {t(
                    "Hörmətli Tələbələr, əgər Rektora hər hansı bir sualınız varsa, müraciətinizi təqdim edə bilərsiniz."
                  )}{" "}
                  {t(
                    "Xahiş olunur, müraciət formasındakı bütün tələb olunan sahələrin tam olaraq doldurulmasını və mətnlərinizi aydın şəkildə ifadə etməyinizi təmin edin."
                  )}
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      htmlFor="name"
                    >
                      <User className="w-4 h-4 text-blue-600" />
                      {t("Ad & Soyad")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      htmlFor="fatherName"
                    >
                      <User className="w-4 h-4 text-blue-600" />
                      {t("Atanızın adı")}
                    </label>
                    <input
                      type="text"
                      id="fatherName"
                      name="fatherName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formik.values.fatherName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fatherName && formik.errors.fatherName ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.fatherName}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      htmlFor="faculty"
                    >
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {t("Fakültə")}
                    </label>
                    <input
                      type="text"
                      id="faculty"
                      name="faculty"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formik.values.faculty}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.faculty && formik.errors.faculty ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.faculty}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      htmlFor="email"
                    >
                      <Mail className="w-4 h-4 text-blue-600" />
                      {t("Email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      htmlFor="phone"
                    >
                      <Phone className="w-4 h-4 text-blue-600" />
                      {t("Telefon nömrəsi")}
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      htmlFor="subject"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      {t("Mövzu")}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" disabled>
                        {t("Seçin")}
                      </option>
                      <option value="question">{t("Sual")}</option>
                      <option value="complaint">{t("Şikayət")}</option>
                      <option value="suggestion">{t("Təklif")}</option>
                      <option value="request">{t("Ərizə")}</option>
                    </select>
                    {formik.touched.subject && formik.errors.subject ? (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.subject}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                    htmlFor="message"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    {t("Müraciətiniz")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={6}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <div className="text-red-600 text-sm mt-2">
                      {formik.errors.message}
                    </div>
                  ) : null}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0D1F4F] to-[#1a2d5f] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    {t("Göndər")}
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
