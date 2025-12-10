import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { News } from '@/types/newsType';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { post, put, remove } from '@/services/commonRequest';
import { Endpoints } from '@/enums/endpoints';
import { formatDate } from '@/utils/formatDate';
import { useTranslation } from 'react-i18next';

interface AdminNewsProps {
    allNews: News[];
    setAllNews: React.Dispatch<React.SetStateAction<News[]>>;
    searchNews: string;
    setSearchNews: React.Dispatch<React.SetStateAction<string>>;
}

const AdminNews: React.FC<AdminNewsProps> = ({ allNews, setAllNews, searchNews, setSearchNews }) => {
    const { i18n } = useTranslation();

    const [modalData, setModalData] = useState<News>({
        id: '',
        title: {
            az: '',
            en: ''
        },
        coverImage: '',
        createdAt: Date.now(),
        updatedAt: Date.now().toString(),
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleAddNews = () => {
        setModalData({
            id: '',
            title: {
                az: '',
                en: ''
            },
            coverImage: '',
            createdAt: Date.now(),
            updatedAt: Date.now().toString(),
        });
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const handleEditNews = (id: string) => {
        const news = allNews.find((item) => item.id === id);
        if (news) {
            setModalData(news);
            setIsEdit(true);
            setIsModalOpen(true);
        }
    };

    const handleDeleteNews = async (id: string) => {
        try {
            await remove<News>(Endpoints.news, id);
            setAllNews(allNews.filter(news => news.id !== id));
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleModalSubmit = async () => {
        try {
            const payload = { ...modalData } as Partial<News>;
            delete (payload as any).createdAt;
            delete (payload as any).updatedAt;
            delete (payload as any).id;

            if (isEdit && modalData.id) {
                const updated = await put<News, Partial<News>>(Endpoints.news, modalData.id, payload);
                setAllNews(allNews.map(n => (n.id === modalData.id ? updated : n)));
            } else {
                const created = await post<News, Partial<News>>(Endpoints.news, payload);
                setAllNews((prev) => [...prev, created]);
            }

            setIsModalOpen(false);
            setModalData({
                id: '',
                title: { az: '', en: '' },
                coverImage: '',
                createdAt: Date.now(),
                updatedAt: Date.now().toString(),
            });
        } catch (error) {
            console.error('Error submitting modal data:', error);
        }
    };

    return (
        <>
            <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
                <DialogHeader></DialogHeader>
                <DialogContent>
                    <DialogTitle>{isEdit ? 'Dəyişdir' : 'Əlavə et'}</DialogTitle>
                    <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }}>
                        {/* Azerbaijani Title Input */}
                        <input
                            type="text"
                            placeholder="Başlıq (Azerbaijani)"
                            value={modalData.title.az}
                            onChange={(e) => setModalData({ ...modalData, title: { ...modalData.title, az: e.target.value } })}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            required
                        />
                        {/* English Title Input */}
                        <input
                            type="text"
                            placeholder="Title (English)"
                            value={modalData.title.en}
                            onChange={(e) => setModalData({ ...modalData, title: { ...modalData.title, en: e.target.value } })}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            required
                        />
                        {/* Cover Image Input */}
                        <input
                            type="url"
                            placeholder="Şəkil URL-i"
                            value={modalData.coverImage}
                            onChange={(e) => setModalData({ ...modalData, coverImage: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            required
                        />
                        <div className="mb-4">
                            <p>Yaradılma tarixi: {formatDate(modalData.createdAt ? modalData.createdAt : Date.now())}</p>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#0D1F4F] text-white py-2 px-4 rounded-md hover:bg-[#0a1838] transition w-full"
                        >
                            Yadda saxla
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 text-center block w-full bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
                        >
                            İmtina et
                        </button>
                    </form>
                </DialogContent>
            </Dialog>

            <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Button onClick={handleAddNews} className="bg-[#0D1F4F] text-white px-4 py-2 rounded-xl hover:bg-[#0a1838] transition">
                        Xəbər əlavə et
                    </Button>
                    <input
                        type="text"
                        className="p-2 border border-border/60 rounded-xl w-full sm:w-64 bg-white"
                        placeholder="Xəbəri axtar"
                        value={searchNews}
                        onChange={(e) => setSearchNews(e.target.value)}
                    />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3">
                    {allNews.filter(news =>
                        news.title.az.toLowerCase().includes(searchNews.toLowerCase()) ||
                        news.title.en.toLowerCase().includes(searchNews.toLowerCase())
                    ).map((news) => (
                        <div key={news.id} className="rounded-xl border border-border/60 bg-white hover:shadow-md transition p-4">
                            <div className="flex gap-4 items-start">
                                <img src={news.coverImage} alt={news.title[i18n.language as keyof typeof news.title]} className="w-24 h-24 object-cover rounded-lg" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-[#0D1F4F] truncate">Azərbaycanca: {news.title.az}</div>
                                    <div className="font-semibold text-[#0D1F4F] truncate">English: {news.title.en}</div>
                                    <div className="mt-3 flex gap-2">
                                        <button onClick={() => news.id && handleEditNews(news.id)} className="rounded-lg bg-[#0D1F4F] text-white px-3 py-1 text-sm hover:bg-[#0a1838]">Dəyişdir</button>
                                        <button onClick={() => news.id && handleDeleteNews(news.id)} className="rounded-lg bg-[#D32F2F] text-white px-3 py-1 text-sm hover:bg-[#9A0000]">Sil</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminNews;
