export default function About() {
    return (
        <div className="w-full h-full bg-cover bg-center flex flex-row items-center" style={{backgroundImage: 'url(/bk_h1.jpg)' }}>
            <div className="w-full flex flex-col items-center">
                    <div className="inline-block items-start rounded-xl bg-gray-900 bg-opacity-80 p-8 m-4">
                        <h1 className="text-4xl font-bold text-white">Team members</h1>
                        <p className="mt-4 text-lg text-muted-foreground text-slate-200">
                            <ul className="text-center">
                                <li>Đặng Vũ Tuấn Kiệt</li>
                                <li>Bùi Trọng Văn</li>
                                <li>Bùi Văn Quốc Bảo</li>
                                <li>Đặng Hoàng Khang</li>
                                <li>Đặng Ngọc Bảo Trâm</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
    )
}