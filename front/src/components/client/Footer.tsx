import {
  Send,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: "ana_sehife", to: "/" },
      { label: "haqqimizda", to: "/haqqimizda/xos-gelmisiniz" },
      { label: "merkezin_missiyasi", to: "/haqqimizda/merkezin-missiyasi" },
    ],
    research: [
      {
        label: "Tədqiqat Proqramları",
        to: "/elmi-fealiyyet/tedqiqat-proqramlari",
      },
      { label: "Tədqiqat Qrupu", to: "/elmi-fealiyyet/tedqiqat-qrupu" },
      {
        label: "Tədqiqat Nəticələri",
        to: "/elmi-fealiyyet/tedqiqat-neticeleri",
      },
    ],
    news: [
      { label: "xeberler", to: "/xeberler" },
      { label: "elanlar", to: "/elanlar" },
      { label: "Seminarlar", to: "/elmi-fealiyyet/seminarlar" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-700" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-[#0D1F4F] to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      {/* Wave Separator */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 55C840 50 960 40 1080 35C1200 30 1320 30 1380 30L1440 30V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z"
            fill="rgb(249, 250, 251)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6 group">
              <div className="flex items-center gap-3">
                <img
                  src="/mathematics_research_lab_logo2.jpg"
                  alt="Mathematics Research Center"
                  className="w-16 h-16 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Mathematics
                  </h3>
                  <p className="text-sm text-blue-200">Research Center</p>
                </div>
              </div>
            </Link>

            <p className="text-blue-100/80 leading-relaxed mb-6 text-sm">
              {t(
                "Advancing mathematical knowledge through cutting-edge research, collaboration, and academic excellence."
              )}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 ${social.color} hover:scale-110 hover:shadow-lg`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - About */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-300" />
              {t("haqqimizda")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-blue-100/80 hover:text-white transition-all duration-300 flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{t(link.label)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Research */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-300" />
              {t("elmi_fealiyyet")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.research.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-blue-100/80 hover:text-white transition-all duration-300 flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{t(link.label)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-300" />
              {t("elaqe")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-blue-100/80">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-300" />
                <span>{t("Z. Xəlilov küçəsi, 33, AZ1148")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-blue-100/80">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-300" />
                <a
                  href="mailto:info@mathcenter.az"
                  className="hover:text-white transition-colors"
                >
                  info@mathcenter.az
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-blue-100/80">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-300" />
                <a
                  href="tel:+994"
                  className="hover:text-white transition-colors"
                >
                  +994 (12) XXX XX XX
                </a>
              </li>
            </ul>

            {/* Contact Button */}
            <div className="mt-6">
              <Link to="/rektora-muraciet">
                <Button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <Send className="w-4 h-4 mr-2" />
                  {t("Rektora müraciət")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-10 pb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Stay Updated
            </h4>
            <p className="text-blue-100/80 mb-6">
              Subscribe to our newsletter for the latest research updates and
              events
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              />
              <Button className="bg-white text-[#0D1F4F] hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-100/60">
            <p>
              © {currentYear} Mathematics Research Center. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link className="hover:text-white transition-colors" to="/admin">
                Admin
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
