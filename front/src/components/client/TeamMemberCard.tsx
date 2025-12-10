import { t } from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';

interface TeamMemberCardProps {
    name: string;
    role: string;
    email: string;
    researchInterests: string;
    imageUrl: string;
    link: string
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
    name,
    role,
    email,
    researchInterests,
    imageUrl,
    link
}) => {

    const getImageUrl = (url?: string) => {
        if (!url) return "/mathematics_research_lab_logo.jpg";
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        return url;
    };

    return (
        <div className="flex flex-col md:flex-row bg-[#F3F3F4] p-6 mb-6 shadow-md">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <img
                    src={getImageUrl(imageUrl)}
                    alt={name}
                    className="w-40 h-40 mx-auto md:mx-0 rounded-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/mathematics_research_lab_logo.jpg";
                    }}
                />
            </div>
            <div className="w-full md:ml-6">
                <Link to={`/${link}`} className="text-blue-600 hover:underline">
                    {name}
                </Link>
                <p className="text-md text-gray-600">{role}</p>
                <p className=" text-gray-600 my-2">
                    <span className="font-bold text-gray-800">E-mail:</span> {email}
                </p>
                <p>
                    <span className="font-bold text-gray-800">{t("Tədqiqat maraqları:")}</span>{' '}
                    <span className="text-gray-600">{researchInterests}</span>
                </p>
            </div>
        </div>
    );
};

export default TeamMemberCard;
