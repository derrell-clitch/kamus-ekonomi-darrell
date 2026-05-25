import React, { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, X, Quote, TrendingUp, Landmark, LineChart, Briefcase, ChevronRight, GraduationCap } from 'lucide-react';

// --- DATA QUOTES EKONOM ---
const quotes = [
  { text: "It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own self-interest.", author: "Adam Smith" },
  { text: "In the long run, we are all dead.", author: "John Maynard Keynes" },
  { text: "Inflation is taxation without legislation.", author: "Milton Friedman" },
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett" },
  { text: "Risk comes from not knowing what you're doing.", author: "Warren Buffett" },
  { text: "There ain't no such thing as a free lunch.", author: "Milton Friedman" }
];

// --- DATA KAMUS LITERASI KEUANGAN (Bilingual) ---
// Ratusan entri yang mencakup Pasar Modal, Uang, Asuransi, Fiskal, Moneter, Akuntansi, Perilaku Ekonomi, dll.
const dictionaryData = [
  // --- EKONOMI DASAR ---
  {
    term: "Scarcity",
    category: "Ekonomi",
    shortId: "Kondisi sumber daya terbatas untuk kebutuhan tak terbatas.",
    shortEn: "Condition of limited resources for unlimited wants.",
    detailId: "Kelangkaan (Scarcity) adalah masalah ekonomi mendasar karena manusia memiliki kebutuhan dan keinginan yang tidak terbatas, sedangkan sumber daya alam, tenaga kerja, dan modal yang tersedia sangat terbatas.",
    detailEn: "Scarcity is the fundamental economic problem of having seemingly unlimited human wants in a world of limited resources. It states that society has insufficient productive resources to fulfill all human wants and needs."
  },
  {
    term: "Opportunity Cost",
    category: "Ekonomi",
    shortId: "Biaya peluang dari alternatif terbaik yang dikorbankan.",
    shortEn: "The value of the next best alternative forgone.",
    detailId: "Biaya Peluang (Opportunity Cost) adalah nilai dari alternatif terbaik yang harus dikorbankan ketika seseorang membuat sebuah pilihan. Ini adalah konsep krusial dalam pengambilan keputusan ekonomi.",
    detailEn: "Opportunity cost is the potential benefit that is lost when you choose one alternative over another. It's a key concept in economics representing the true cost of any decision."
  },
  {
    term: "Ceteris Paribus",
    category: "Ekonomi",
    shortId: "Asumsi bahwa semua variabel lain tetap konstan.",
    shortEn: "Assumption that all other variables remain constant.",
    detailId: "Ceteris Paribus adalah frasa Latin yang berarti 'hal-hal lain dianggap tetap'. Dalam ilmu ekonomi, ini digunakan untuk menyederhanakan analisis dengan mengasumsikan bahwa hanya satu variabel yang berubah sementara yang lain tetap.",
    detailEn: "A Latin phrase meaning 'all other things being equal'. In economics, it acts as a shorthand indication of the effect of one economic variable on another, keeping all other variables constant."
  },
  {
    term: "Law of Demand",
    category: "Ekonomi",
    shortId: "Hukum Permintaan: harga naik, kuantitas diminta turun.",
    shortEn: "As price increases, quantity demanded decreases.",
    detailId: "Hukum Permintaan menyatakan bahwa, ceteris paribus, semakin tinggi harga suatu barang, semakin sedikit jumlah barang tersebut yang akan diminta oleh konsumen.",
    detailEn: "The law of demand states that, conditional on all else being equal, as the price of a good increases, quantity demanded decreases; conversely, as the price of a good decreases, quantity demanded increases."
  },
  {
    term: "Law of Supply",
    category: "Ekonomi",
    shortId: "Hukum Penawaran: harga naik, kuantitas ditawarkan naik.",
    shortEn: "As price increases, quantity supplied increases.",
    detailId: "Hukum Penawaran menyatakan bahwa terdapat hubungan positif antara harga dan kuantitas yang ditawarkan. Produsen bersedia menawarkan lebih banyak barang pada harga yang lebih tinggi.",
    detailEn: "The law of supply is the microeconomic law that states that, all other factors being equal, as the price of a good or service increases, the quantity of goods or services that suppliers offer will increase."
  },
  {
    term: "Marginal Utility",
    category: "Ekonomi",
    shortId: "Tambahan kepuasan dari konsumsi satu unit tambahan.",
    shortEn: "Additional satisfaction from consuming one more unit.",
    detailId: "Utilitas Marginal adalah kepuasan atau manfaat tambahan yang diperoleh konsumen dengan mengonsumsi satu unit tambahan dari suatu barang atau jasa.",
    detailEn: "Marginal utility is the added satisfaction a consumer gets from having one more unit of a good or service. The concept is used to determine how much of an item consumers are willing to purchase."
  },
  {
    term: "Law of Diminishing Marginal Utility",
    category: "Ekonomi",
    shortId: "Tambahan kepuasan yang semakin menurun.",
    shortEn: "Decreasing added satisfaction from extra consumption.",
    detailId: "Hukum Utilitas Marginal yang Semakin Menurun (Hukum Gossen I) menyatakan bahwa semakin banyak unit barang yang dikonsumsi, tambahan kepuasan (utilitas marginal) dari unit berikutnya akan semakin menurun.",
    detailEn: "The law of diminishing marginal utility states that the marginal utility of a good or service declines as its available supply increases. Economic actors devote each successive unit of the good to less and less valued ends."
  },
  {
    term: "Indifference Curve",
    category: "Ekonomi",
    shortId: "Kurva yang menunjukkan kombinasi barang dengan kepuasan sama.",
    shortEn: "Curve showing combinations of goods giving equal satisfaction.",
    detailId: "Kurva Indiferensi adalah kurva yang menghubungkan titik-titik kombinasi dari dua barang atau jasa yang memberikan tingkat kepuasan (utilitas) yang sama kepada konsumen.",
    detailEn: "An indifference curve shows a combination of two goods that give a consumer equal satisfaction and utility, thereby making the consumer indifferent."
  },
  {
    term: "Price Ceiling",
    category: "Ekonomi",
    shortId: "Batas harga tertinggi yang ditetapkan pemerintah.",
    shortEn: "Maximum legal price set by the government.",
    detailId: "Price Ceiling atau Harga Eceran Tertinggi adalah harga maksimum yang sah yang diizinkan untuk dijual atas suatu barang atau jasa, biasanya bertujuan untuk melindungi konsumen.",
    detailEn: "A price ceiling is a government-imposed price control, or limit, on how high a price is charged for a product. Governments intend price ceilings to protect consumers from conditions that could make commodities prohibitively expensive."
  },
  {
    term: "Price Floor",
    category: "Ekonomi",
    shortId: "Batas harga terendah yang ditetapkan pemerintah.",
    shortEn: "Minimum legal price set by the government.",
    detailId: "Price Floor atau Harga Dasar Minimum adalah batas bawah yang ditetapkan pemerintah terhadap harga suatu barang atau jasa, biasanya untuk melindungi produsen (seperti UMP untuk tenaga kerja).",
    detailEn: "A price floor is a government- or group-imposed price control or limit on how low a price can be charged for a product, good, commodity, or service."
  },

  // --- PASAR MODAL & INVESTASI ---
  {
    term: "Stock (Saham)",
    category: "Pasar Modal",
    shortId: "Bukti kepemilikan sebagian dari suatu perusahaan.",
    shortEn: "A fraction of ownership in a corporation.",
    detailId: "Saham adalah instrumen pasar keuangan yang berupa surat berharga tanda penyertaan modal seseorang atau pihak (badan usaha) dalam suatu perusahaan atau perseroan terbatas (PT).",
    detailEn: "A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. This entitles the owner of the stock to a proportion of the corporation's assets and profits."
  },
  {
    term: "Bond (Obligasi)",
    category: "Pasar Modal",
    shortId: "Surat utang jangka menengah atau panjang.",
    shortEn: "A fixed-income instrument representing a loan.",
    detailId: "Obligasi adalah surat utang jangka menengah maupun jangka panjang yang dapat diperjualbelikan. Obligasi berisi janji dari pihak penerbit untuk membayar imbalan berupa bunga pada periode tertentu dan melunasi pokok utang pada waktu yang ditentukan.",
    detailEn: "A bond is a fixed-income instrument that represents a loan made by an investor to a borrower (typically corporate or governmental). A bond could be thought of as an I.O.U. between the lender and borrower."
  },
  {
    term: "Mutual Fund (Reksadana)",
    category: "Pasar Modal",
    shortId: "Wadah kumpulan dana investor yang dikelola manajer investasi.",
    shortEn: "A pool of money managed by professionals.",
    detailId: "Reksadana adalah wadah yang dipergunakan untuk menghimpun dana dari masyarakat pemodal untuk selanjutnya diinvestasikan dalam portofolio efek oleh Manajer Investasi.",
    detailEn: "A mutual fund is a company that pools money from many investors and invests the money in securities such as stocks, bonds, and short-term debt."
  },
  {
    term: "Sukuk",
    category: "Pasar Modal",
    shortId: "Sertifikat bernilai setara yang mewakili porsi kepemilikan (Syariah).",
    shortEn: "Islamic financial certificate, similar to a bond.",
    detailId: "Sukuk adalah efek syariah berupa sertifikat atau bukti kepemilikan yang bernilai sama dan mewakili bagian yang tidak terpisahkan atas aset berwujud, hak manfaat, atau proyek tertentu.",
    detailEn: "Sukuk is the Arabic name for financial certificates, but commonly refers to the Islamic equivalent of bonds. Sukuk securities are structured to comply with Islamic religious law commonly known as Sharia."
  },
  {
    term: "Initial Public Offering (IPO)",
    category: "Pasar Modal",
    shortId: "Penawaran saham perdana perusahaan kepada publik.",
    shortEn: "The first sale of stock by a company to the public.",
    detailId: "IPO adalah proses di mana sebuah perusahaan swasta menawarkan sahamnya kepada publik untuk pertama kalinya agar dapat diperdagangkan di bursa efek.",
    detailEn: "An initial public offering (IPO) refers to the process of offering shares of a private corporation to the public in a new stock issuance. Public share issuance allows a company to raise capital from public investors."
  },
  {
    term: "Bull Market",
    category: "Pasar Modal",
    shortId: "Kondisi pasar keuangan yang sedang mengalami tren naik.",
    shortEn: "A financial market condition where prices are rising.",
    detailId: "Bull Market adalah istilah yang digunakan untuk menggambarkan kondisi pasar saham yang sedang mengalami tren kenaikan harga secara berkelanjutan, didorong oleh optimisme investor.",
    detailEn: "A bull market is the condition of a financial market of a group of securities in which prices are rising or are expected to rise. The term is typically used to refer to the stock market."
  },
  {
    term: "Bear Market",
    category: "Pasar Modal",
    shortId: "Kondisi pasar keuangan yang sedang mengalami tren turun.",
    shortEn: "A financial market condition where prices are falling.",
    detailId: "Bear Market adalah kebalikan dari Bull Market, yaitu kondisi pasar yang mengalami tren penurunan harga secara terus-menerus (biasanya melebihi 20%) akibat pesimisme pasar.",
    detailEn: "A bear market is when a market experiences prolonged price declines. It typically describes a condition in which securities prices fall 20% or more from recent highs amid widespread pessimism."
  },
  {
    term: "Dividend",
    category: "Pasar Modal",
    shortId: "Pembagian sebagian laba perusahaan kepada pemegang saham.",
    shortEn: "A distribution of a portion of a company's earnings.",
    detailId: "Dividen adalah pembagian sebagian laba perusahaan kepada para pemegang saham, yang besarnya ditetapkan oleh dewan direksi dan disetujui dalam Rapat Umum Pemegang Saham (RUPS).",
    detailEn: "A dividend is the distribution of some of a company's earnings to a class of its shareholders, as determined by the company's board of directors."
  },
  {
    term: "Capital Gain",
    category: "Pasar Modal",
    shortId: "Keuntungan dari kenaikan harga aset atau investasi.",
    shortEn: "Profit from the increase in value of an asset.",
    detailId: "Capital Gain adalah keuntungan finansial yang diperoleh ketika sebuah aset (seperti saham atau properti) dijual dengan harga yang lebih tinggi daripada harga belinya.",
    detailEn: "A capital gain is the increase in a capital asset's value and is considered to be realized when the asset is sold. It represents the profit earned on the sale."
  },
  {
    term: "Diversification",
    category: "Investasi",
    shortId: "Membagi dana investasi ke berbagai jenis aset untuk mengurangi risiko.",
    shortEn: "Spreading investments around to reduce exposure to risk.",
    detailId: "Diversifikasi adalah strategi manajemen risiko dengan mencampur berbagai jenis investasi di dalam sebuah portofolio. Tujuannya adalah untuk mengurangi risiko jika salah satu aset mengalami kerugian.",
    detailEn: "Diversification is a risk management strategy that mixes a wide variety of investments within a portfolio. The rationale is that a portfolio constructed of different kinds of investments will yield higher returns and pose a lower risk."
  },

  // --- PASAR UANG (MONEY MARKET) ---
  {
    term: "Money Market",
    category: "Pasar Uang",
    shortId: "Pasar untuk instrumen utang jangka pendek (kurang dari 1 tahun).",
    shortEn: "Market for short-term debt instruments (under 1 year).",
    detailId: "Pasar Uang adalah tempat pertemuan antara pihak yang surplus dana dengan pihak yang defisit dana untuk memperdagangkan instrumen keuangan jangka pendek (jatuh tempo di bawah satu tahun).",
    detailEn: "The money market refers to trading in very short-term debt investments. At the wholesale level, it involves large-volume trades between institutions and traders."
  },
  {
    term: "Commercial Paper",
    category: "Pasar Uang",
    shortId: "Surat utang jangka pendek tanpa agunan dari korporasi.",
    shortEn: "Unsecured, short-term corporate debt.",
    detailId: "Commercial Paper (Kertas Komersial) adalah instrumen utang jangka pendek tanpa agunan (unsecured) yang diterbitkan oleh perusahaan untuk memenuhi kebutuhan modal kerja jangka pendek.",
    detailEn: "Commercial paper is an unsecured, short-term debt instrument issued by a corporation, typically for the financing of accounts payable and inventories and meeting short-term liabilities."
  },
  {
    term: "Certificate of Deposit (Sertifikat Deposito)",
    category: "Pasar Uang",
    shortId: "Deposito berjangka yang sertifikatnya dapat dipindahtangankan.",
    shortEn: "A time deposit that can be transferred or sold.",
    detailId: "Sertifikat Deposito adalah simpanan dalam bentuk deposito berjangka yang bukti simpanannya dapat dipindahtangankan (diperjualbelikan di pasar uang).",
    detailEn: "A certificate of deposit (CD) is a product offered by banks and credit unions that provides an interest rate premium in exchange for the customer agreeing to leave a lump-sum deposit untouched for a predetermined period of time."
  },
  {
    term: "Repurchase Agreement (Repo)",
    category: "Pasar Uang",
    shortId: "Penjualan surat berharga dengan janji membeli kembali.",
    shortEn: "Sale of securities with an agreement to repurchase.",
    detailId: "Repo adalah transaksi penjualan surat berharga (seperti obligasi pemerintah) dengan komitmen untuk membelinya kembali di kemudian hari pada harga tertentu.",
    detailEn: "A repurchase agreement (repo) is a form of short-term borrowing for dealers in government securities. In the case of a repo, a dealer sells government securities to investors, usually on an overnight basis, and buys them back the following day."
  },

  // --- KEBIJAKAN MONETER & FISKAL ---
  {
    term: "Monetary Policy",
    category: "Moneter",
    shortId: "Kebijakan bank sentral mengatur suplai uang dan suku bunga.",
    shortEn: "Central bank policy managing money supply and interest rates.",
    detailId: "Kebijakan Moneter adalah tindakan yang diambil oleh bank sentral (seperti Bank Indonesia) untuk mengendalikan jumlah uang beredar, inflasi, dan suku bunga guna mencapai stabilitas ekonomi.",
    detailEn: "Monetary policy is the macroeconomic policy laid down by the central bank. It involves management of money supply and interest rate and is the demand side economic policy used by the government to achieve macroeconomic objectives."
  },
  {
    term: "Fiscal Policy",
    category: "Fiskal",
    shortId: "Kebijakan pemerintah terkait pajak dan pengeluaran negara.",
    shortEn: "Government policy regarding taxation and spending.",
    detailId: "Kebijakan Fiskal adalah kebijakan yang diambil oleh pemerintah melalui penyesuaian pengeluaran negara (belanja pemerintah) dan penerimaan pajak untuk memengaruhi kondisi ekonomi.",
    detailEn: "Fiscal policy is the use of government spending and taxation to influence the economy. Governments typically use fiscal policy to promote strong and sustainable growth and reduce poverty."
  },
  {
    term: "BI Rate / BI 7-Day Repo Rate",
    category: "Moneter",
    shortId: "Suku bunga acuan yang ditetapkan Bank Indonesia.",
    shortEn: "The benchmark interest rate set by Bank Indonesia.",
    detailId: "BI Rate atau sekarang BI 7-Day Reverse Repo Rate adalah suku bunga kebijakan yang mencerminkan sikap atau stance kebijakan moneter yang ditetapkan oleh Bank Indonesia dan diumumkan kepada publik.",
    detailEn: "The BI Rate or BI 7-Day Reverse Repo Rate is the policy interest rate that reflects the monetary policy stance established by Bank Indonesia to steer inflation towards its target."
  },
  {
    term: "Open Market Operations (Operasi Pasar Terbuka)",
    category: "Moneter",
    shortId: "Jual beli surat berharga oleh bank sentral untuk mengatur suplai uang.",
    shortEn: "Central bank buying/selling of securities to manage money supply.",
    detailId: "Operasi Pasar Terbuka adalah kegiatan bank sentral menjual atau membeli surat berharga negara di pasar uang untuk memengaruhi jumlah uang beredar dan tingkat suku bunga.",
    detailEn: "Open market operations (OMO) refers to the central bank practice of buying and selling U.S. Treasury securities, along with other securities, in the open market in order to regulate the supply of money."
  },
  {
    term: "Reserve Requirement Ratio (Giro Wajib Minimum)",
    category: "Moneter",
    shortId: "Persentase dana nasabah yang wajib disimpan bank di bank sentral.",
    shortEn: "Percentage of deposits banks must keep at the central bank.",
    detailId: "Giro Wajib Minimum (GWM) adalah porsi dana pihak ketiga (DPK) yang harus disimpan oleh bank umum dalam bentuk saldo giro di Bank Indonesia sebagai cadangan.",
    detailEn: "The reserve requirement ratio is the portion of reservable liabilities that commercial banks must hold onto, rather than lend out or invest. This is a requirement determined by the country's central bank."
  },
  {
    term: "Budget Deficit",
    category: "Fiskal",
    shortId: "Kondisi di mana pengeluaran pemerintah lebih besar dari penerimaan.",
    shortEn: "When government spending exceeds revenue.",
    detailId: "Defisit Anggaran terjadi ketika total pengeluaran pemerintah melebihi total pendapatannya (terutama dari pajak) dalam satu periode tertentu.",
    detailEn: "A budget deficit occurs when expenses exceed revenue and indicate the financial health of a country. The government generally uses the term budget deficit when referring to spending rather than businesses or individuals."
  },
  {
    term: "Budget Surplus",
    category: "Fiskal",
    shortId: "Kondisi di mana penerimaan pemerintah lebih besar dari pengeluaran.",
    shortEn: "When government revenue exceeds spending.",
    detailId: "Surplus Anggaran terjadi ketika total penerimaan pemerintah (terutama dari pajak) melebihi total pengeluarannya dalam suatu periode.",
    detailEn: "A budget surplus occurs when income exceeds expenditures. The term usually refers to a government's financial state, as individuals often use the term 'savings' instead."
  },
  {
    term: "Inflation",
    category: "Makroekonomi",
    shortId: "Kenaikan harga barang dan jasa secara umum dan terus-menerus.",
    shortEn: "General increase in prices of goods and services.",
    detailId: "Inflasi adalah proses meningkatnya harga-harga barang dan jasa secara umum dan terus-menerus yang mengakibatkan turunnya daya beli mata uang.",
    detailEn: "Inflation is the rate of increase in prices over a given period of time. Inflation is typically a broad measure, such as the overall increase in prices or the increase in the cost of living in a country."
  },
  {
    term: "Deflation",
    category: "Makroekonomi",
    shortId: "Penurunan harga barang dan jasa secara umum.",
    shortEn: "General decrease in prices of goods and services.",
    detailId: "Deflasi adalah periode di mana tingkat harga umum barang dan jasa mengalami penurunan (inflasi negatif), yang sering kali mengindikasikan kelesuan ekonomi.",
    detailEn: "Deflation is a general decline in prices for goods and services, typically associated with a contraction in the supply of money and credit in the economy."
  },

  // --- CURRENCY & FOREX ---
  {
    term: "Exchange Rate (Kurs)",
    category: "Currency",
    shortId: "Harga sebuah mata uang terhadap mata uang negara lain.",
    shortEn: "The value of one currency for the purpose of conversion to another.",
    detailId: "Nilai tukar (kurs) adalah harga mata uang suatu negara yang diukur atau dinyatakan dalam mata uang negara lain.",
    detailEn: "An exchange rate is the rate at which one currency will be exchanged for another currency. It affects trade and the movement of money between countries."
  },
  {
    term: "Appreciation (Apresiasi)",
    category: "Currency",
    shortId: "Kenaikan nilai tukar mata uang melalui mekanisme pasar.",
    shortEn: "An increase in the value of an asset/currency over time.",
    detailId: "Apresiasi adalah kenaikan nilai suatu mata uang terhadap mata uang asing yang terjadi secara alami melalui mekanisme penawaran dan permintaan di pasar valuta asing.",
    detailEn: "Appreciation is an increase in the value of one currency relative to another in the foreign exchange markets, caused by supply and demand."
  },
  {
    term: "Depreciation (Depresiasi Mata Uang)",
    category: "Currency",
    shortId: "Penurunan nilai mata uang melalui mekanisme pasar.",
    shortEn: "A decrease in the value of a currency over time.",
    detailId: "Depresiasi valuta asing adalah penurunan nilai mata uang suatu negara secara relatif terhadap mata uang negara lain akibat dorongan kekuatan pasar (bukan kebijakan pemerintah).",
    detailEn: "Currency depreciation is the loss of value of a country's currency with respect to one or more foreign reference currencies, typically in a floating exchange rate system."
  },
  {
    term: "Devaluation (Devaluasi)",
    category: "Currency",
    shortId: "Penurunan nilai mata uang yang disengaja oleh pemerintah.",
    shortEn: "Deliberate downward adjustment of a country's currency value.",
    detailId: "Devaluasi adalah kebijakan moneter yang diambil oleh pemerintah untuk menurunkan nilai mata uang negaranya secara sengaja terhadap mata uang asing dalam sistem kurs tetap.",
    detailEn: "Devaluation is the deliberate downward adjustment of the value of a country's money relative to another currency, group of currencies, or economic standard."
  },
  {
    term: "Revaluation (Revaluasi)",
    category: "Currency",
    shortId: "Kenaikan nilai mata uang yang disengaja oleh pemerintah.",
    shortEn: "Deliberate upward adjustment of a country's currency value.",
    detailId: "Revaluasi adalah kebijakan moneter untuk menaikkan nilai mata uang domestik secara sengaja terhadap mata uang asing di bawah rezim nilai tukar tetap.",
    detailEn: "Revaluation is a calculated upward adjustment to a country's official exchange rate relative to a chosen baseline. The baseline can be anything from wage rates to the price of gold to a foreign currency."
  },

  // --- ASURANSI & REASURANSI ---
  {
    term: "Premium (Premi)",
    category: "Asuransi",
    shortId: "Sejumlah uang yang dibayarkan peserta kepada perusahaan asuransi.",
    shortEn: "Amount paid for an insurance policy.",
    detailId: "Premi adalah sejumlah uang yang ditetapkan oleh perusahaan asuransi dan disetujui oleh pemegang polis untuk dibayarkan secara berkala sebagai biaya pengalihan risiko.",
    detailEn: "An insurance premium is the amount of money an individual or business pays for an insurance policy. Insurance premiums are paid for policies that cover healthcare, auto, home, and life."
  },
  {
    term: "Utmost Good Faith",
    category: "Asuransi",
    shortId: "Prinsip itikad baik yang sempurna dalam perjanjian asuransi.",
    shortEn: "Principle of complete honesty in an insurance contract.",
    detailId: "Utmost Good Faith (Uberrimae Fidei) adalah prinsip dasar asuransi yang mewajibkan tertanggung untuk secara jujur mengungkapkan seluruh fakta material yang relevan dengan objek asuransi.",
    detailEn: "Utmost good faith is a common law principle requiring both the insurer and the insured to act honestly and not mislead or withhold critical information from one another."
  },
  {
    term: "Indemnity",
    category: "Asuransi",
    shortId: "Prinsip ganti rugi sebesar kerugian riil yang dialami.",
    shortEn: "Compensation for exact damages or loss.",
    detailId: "Indemnity (Ganti Rugi) adalah prinsip di mana perusahaan asuransi akan memberikan kompensasi finansial yang mengembalikan tertanggung pada posisi keuangan yang sama seperti sesaat sebelum kerugian terjadi, tanpa mencari keuntungan.",
    detailEn: "Indemnity is a comprehensive form of insurance compensation for damages or loss. In the legal sense, it may also refer to an exemption from liability for damages."
  },
  {
    term: "Reinsurance (Reasuransi)",
    category: "Asuransi",
    shortId: "Asuransi bagi perusahaan asuransi untuk membagi risiko besar.",
    shortEn: "Insurance that an insurance company purchases from another.",
    detailId: "Reasuransi adalah proses di mana sebuah perusahaan asuransi mengalihkan sebagian dari portofolio risikonya kepada pihak ketiga (perusahaan reasuransi) untuk melindungi diri dari kerugian katastropik besar.",
    detailEn: "Reinsurance occurs when multiple insurance companies share risk by purchasing insurance policies from other insurers to limit their own total loss the original insurer would experience in case of a disaster."
  },

  // --- AKUNTANSI ---
  {
    term: "Assets (Aset)",
    category: "Akuntansi",
    shortId: "Kekayaan ekonomi yang dimiliki perusahaan.",
    shortEn: "Resources owned by a business.",
    detailId: "Aset adalah sumber daya ekonomi yang dimiliki atau dikendalikan oleh entitas (perusahaan) yang diharapkan memberikan manfaat ekonomi di masa depan. Termasuk kas, piutang, dan peralatan.",
    detailEn: "An asset is a resource with economic value that an individual, corporation, or country owns or controls with the expectation that it will provide a future benefit."
  },
  {
    term: "Liabilities (Liabilitas/Utang)",
    category: "Akuntansi",
    shortId: "Kewajiban finansial perusahaan kepada pihak luar.",
    shortEn: "Financial debts or obligations of a company.",
    detailId: "Liabilitas adalah kewajiban finansial entitas yang timbul dari peristiwa masa lalu, yang penyelesaiannya diharapkan mengakibatkan arus keluar sumber daya perusahaan (pembayaran utang).",
    detailEn: "A liability is something a person or company owes, usually a sum of money. Liabilities are settled over time through the transfer of economic benefits including money, goods, or services."
  },
  {
    term: "Equity (Ekuitas/Modal)",
    category: "Akuntansi",
    shortId: "Hak pemilik atas sisa aset setelah dikurangi liabilitas.",
    shortEn: "Owner's claim after subtracting liabilities from assets.",
    detailId: "Ekuitas adalah hak residual atau sisa atas aset perusahaan setelah dikurangi seluruh liabilitas/utangnya. Ini merepresentasikan kepemilikan modal pemegang saham.",
    detailEn: "Equity represents the value that would be returned to a company's shareholders if all of the assets were liquidated and all of the company's debts were paid off."
  },
  {
    term: "Accounting Equation",
    category: "Akuntansi",
    shortId: "Persamaan dasar: Aset = Liabilitas + Ekuitas.",
    shortEn: "Basic formula: Assets = Liabilities + Equity.",
    detailId: "Persamaan Dasar Akuntansi adalah fondasi sistem pembukuan berpasangan (double-entry). Persamaan ini menyatakan bahwa total aset sebuah entitas harus selalu sama dengan jumlah liabilitas dan ekuitasnya.",
    detailEn: "The accounting equation states that a company's total assets are equal to the sum of its liabilities and its shareholders' equity. It is the foundation of the double-entry accounting system."
  },
  {
    term: "General Journal (Jurnal Umum)",
    category: "Akuntansi",
    shortId: "Buku catatan harian untuk mencatat transaksi keuangan secara kronologis.",
    shortEn: "A chronological record of financial transactions.",
    detailId: "Jurnal umum adalah tempat mencatat semua transaksi keuangan secara kronologis dengan menyebutkan akun yang di-debit dan di-kredit beserta jumlah nominalnya.",
    detailEn: "A general journal is a daybook or subsidiary journal in which transactions are recorded in chronological order before they are posted to the ledger accounts."
  },
  {
    term: "Drawing (Prive)",
    category: "Akuntansi",
    shortId: "Pengambilan aset perusahaan oleh pemilik untuk keperluan pribadi.",
    shortEn: "Withdrawal of company assets by the owner for personal use.",
    detailId: "Prive adalah penarikan sejumlah uang tunai atau aset lainnya dari perusahaan oleh pemiliknya untuk kepentingan dan konsumsi pribadi, bukan untuk bisnis.",
    detailEn: "A drawing account is an accounting record maintained to track money withdrawn from a business by its owners. A drawing account is used primarily for businesses that are taxed as sole proprietorships or partnerships."
  },

  // --- PERBANKAN & KREDIT ---
  {
    term: "Non-Performing Loan (NPL)",
    category: "Perbankan",
    shortId: "Kredit bermasalah atau gagal bayar.",
    shortEn: "A bank loan that is subject to late repayment or default.",
    detailId: "NPL atau Kredit Macet adalah pinjaman bank di mana nasabah gagal membayar cicilan pokok dan/atau bunga sesuai dengan tenggat waktu yang ditentukan, biasanya selama 90 hari atau lebih.",
    detailEn: "A nonperforming loan (NPL) is a loan that is in default or close to being in default. Many loans become nonperforming after being in default for 90 days, but this can depend on the contract terms."
  },
  {
    term: "Compound Interest (Bunga Majemuk)",
    category: "Perbankan",
    shortId: "Bunga yang dihitung dari pokok awal plus bunga yang terakumulasi.",
    shortEn: "Interest calculated on the initial principal and accumulated interest.",
    detailId: "Bunga Majemuk adalah bunga yang dihitung berdasarkan jumlah pokok awal pinjaman atau simpanan, ditambah dengan akumulasi bunga dari periode sebelumnya (bunga berbunga).",
    detailEn: "Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on principal plus interest. It is the result of reinvesting interest."
  },
  {
    term: "Collateral (Agunan)",
    category: "Perbankan",
    shortId: "Aset berharga yang dijaminkan peminjam kepada pemberi pinjaman.",
    shortEn: "An asset a lender accepts as security for a loan.",
    detailId: "Agunan atau Jaminan adalah aset properti atau barang berharga lainnya yang dijanjikan oleh pihak peminjam untuk mengamankan sebuah pinjaman kredit kepada bank.",
    detailEn: "Collateral is an item of value that a lender can seize from a borrower if he or she fails to repay a loan according to the agreed terms."
  },

  // --- LABOR MARKET (PASAR TENAGA KERJA) ---
  {
    term: "Labor Force (Angkatan Kerja)",
    category: "Labor Market",
    shortId: "Kelompok penduduk usia kerja yang bekerja atau mencari kerja.",
    shortEn: "People of working age who are employed or seeking employment.",
    detailId: "Angkatan Kerja mencakup bagian dari populasi penduduk usia produktif (biasanya 15-64 tahun) yang saat ini sedang bekerja maupun yang sedang aktif mencari pekerjaan (menganggur).",
    detailEn: "The labor force is the sum of employed and unemployed persons who are actively seeking work. It does not include people who are not looking for work, children, and retirees."
  },
  {
    term: "Frictional Unemployment",
    category: "Labor Market",
    shortId: "Pengangguran sementara akibat perpindahan pekerjaan.",
    shortEn: "Temporary unemployment while transitioning between jobs.",
    detailId: "Pengangguran Friksional adalah pengangguran jangka pendek yang terjadi secara natural akibat proses pencarian kerja atau transisi pindah dari satu pekerjaan ke pekerjaan lainnya.",
    detailEn: "Frictional unemployment is the result of voluntary employment transitions within an economy. Frictional unemployment naturally occurs, even in a growing, stable economy."
  },
  {
    term: "Structural Unemployment",
    category: "Labor Market",
    shortId: "Pengangguran akibat ketidakcocokan keterampilan atau teknologi.",
    shortEn: "Unemployment from mismatch of skills or structural economic changes.",
    detailId: "Pengangguran Struktural terjadi ketika ada pergeseran mendasar dalam perekonomian yang membuat keahlian pekerja tidak lagi sesuai dengan yang dibutuhkan oleh industri (misal karena digantikan mesin/AI).",
    detailEn: "Structural unemployment is a long-lasting event that is caused by fundamental shifts in an economy and exacerbated by extraneous factors such as technology, competition, and government policy."
  },
  {
    term: "Cyclical Unemployment",
    category: "Labor Market",
    shortId: "Pengangguran yang disebabkan oleh siklus bisnis (resesi).",
    shortEn: "Unemployment resulting from economic downturns.",
    detailId: "Pengangguran Siklis adalah jenis pengangguran yang berhubungan langsung dengan fase resesi atau penurunan kondisi perekonomian secara makro, di mana permintaan agregat menurun.",
    detailEn: "Cyclical unemployment is the component of overall unemployment that results directly from cycles of economic upturn and downturn. Unemployment typically rises during recessions."
  },

  // --- BEHAVIORAL ECONOMICS (EKONOMI PERILAKU) ---
  {
    term: "Behavioral Economics",
    category: "Perilaku Ekonomi",
    shortId: "Studi psikologi dalam proses pengambilan keputusan ekonomi.",
    shortEn: "Study of psychology in economic decision making.",
    detailId: "Ekonomi Perilaku (Behavioral Economics) menggabungkan wawasan dari psikologi dan ilmu ekonomi untuk memahami mengapa orang kadang membuat keputusan irasional yang tidak sesuai dengan teori ekonomi klasik.",
    detailEn: "Behavioral economics studies the effects of psychological, cognitive, emotional, cultural and social factors on the decisions of individuals and institutions and how those decisions vary from those implied by classical economic theory."
  },
  {
    term: "Loss Aversion",
    category: "Perilaku Ekonomi",
    shortId: "Kecenderungan manusia lebih takut rugi daripada suka untung.",
    shortEn: "Tendency to prefer avoiding losses over acquiring equivalent gains.",
    detailId: "Loss Aversion adalah bias kognitif di mana rasa sakit akibat kehilangan sesuatu (misal rugi uang Rp 1 Juta) terasa lebih kuat secara psikologis daripada kesenangan mendapatkan jumlah yang sama.",
    detailEn: "Loss aversion is a cognitive bias that explains why individuals feel the pain of a loss more acutely than the joy of an equivalent gain."
  },
  {
    term: "Sunk Cost Fallacy",
    category: "Perilaku Ekonomi",
    shortId: "Melanjutkan proyek merugi karena sudah berinvestasi banyak di masa lalu.",
    shortEn: "Continuing an endeavor due to previously invested resources.",
    detailId: "Sunk Cost Fallacy (Kesesatan Biaya Hangus) adalah kecenderungan psikologis seseorang untuk terus melanjutkan tindakan atau investasi hanya karena mereka telah menghabiskan waktu, uang, atau upaya untuk itu, padahal tindakan tersebut sudah jelas akan merugikan ke depannya.",
    detailEn: "The sunk cost fallacy is our tendency to follow through on an endeavor if we have already invested time, effort, or money into it, whether or not the current costs outweigh the benefits."
  },
  {
    term: "Confirmation Bias",
    category: "Perilaku Ekonomi",
    shortId: "Hanya mencari informasi yang membenarkan opini pribadi.",
    shortEn: "Tendency to search for info that confirms one's preconceptions.",
    detailId: "Bias Konfirmasi adalah tendensi psikologis investor atau individu untuk hanya mencari, menafsirkan, atau mengingat informasi yang mendukung opini atau keputusan yang sudah mereka buat sebelumnya.",
    detailEn: "Confirmation bias is the tendency to search for, interpret, favor, and recall information in a way that confirms or supports one's prior beliefs or values."
  },
  {
    term: "Herd Behavior",
    category: "Perilaku Ekonomi",
    shortId: "Ikut-ikutan keputusan mayoritas tanpa analisis (FOMO).",
    shortEn: "Individuals acting together in a group without planned direction.",
    detailId: "Perilaku Menggembala (Herd Behavior) dalam investasi keuangan adalah ketika investor membabi-buta meniru apa yang dilakukan oleh mayoritas investor lain, yang sering memicu gelembung pasar (market bubbles) atau kejatuhan drastis.",
    detailEn: "Herd behavior is the phenomenon in which individuals act collectively as part of a group, often making decisions based on what others are doing rather than on their own independent analysis."
  }
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedTerm, setSelectedTerm] = useState({});
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Extract unique categories
  const categories = ["Semua", ...new Set(dictionaryData.map(item => item.category))];

  // Logic to rotate quotes periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Filter functionality
  const filteredData = useMemo(() => {
    return dictionaryData.filter(item => {
      const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
      const matchSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.shortId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.shortEn.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  // Handler for closing modal
  const closeModal = () => setSelectedTerm({
  term: "",
  definition: ""
});

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200">
      
      {/* TOP CREDIT BAR */}
      <div className="bg-slate-950 text-slate-400 text-xs py-2 px-4 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-3 z-20 relative border-b border-slate-800">
        <span>Credit: <strong className="text-slate-200 tracking-widest font-bold">DARRELL ZHAFIF BAZLA</strong></span>
        <span className="hidden sm:inline text-slate-600">|</span>
        <a href="https://instagram.com/darrell.zhafif" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 text-slate-300 transition-colors flex items-center gap-1.5 font-medium">
          <span>📷</span> @darrell.zhafif
        </a>
      </div>

      {/* HEADER SECTION */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-xl">
        <div className="container mx-auto px-4 py-4 md:py-6 relative flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo / Branding */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-inner">
              <Landmark className="w-8 h-8 text-blue-900" strokeWidth={2.5}/>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-100 flex items-center gap-2">
                Darrell Economics <GraduationCap className="w-5 h-5 text-yellow-400" />
              </span>
              <span className="text-sm font-medium text-slate-300 uppercase tracking-widest">Education Financial Literacy</span>
            </div>
          </div>

          {/* Quotes Section */}
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 transition-all">
            <Quote className="text-yellow-400 w-5 h-5 mb-2 opacity-80" />
            <p className="italic text-sm md:text-base leading-relaxed mb-2 text-slate-100 min-h-[40px] md:min-h-[48px] flex items-center">
              "{quotes[quoteIndex].text}"
            </p>
            <p className="text-xs font-bold text-blue-200 text-right">— {quotes[quoteIndex].author}</p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-8 relative">
        
        {/* Kontrol Pencarian & Filter */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 z-10 sticky top-2">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Cari definisi atau istilah bahasa Inggris..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm text-sm"
              />
            </div>

            {/* Kategori Filters (Scrollable on Mobile) */}
            <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar snap-x">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
          </div>
        </div>

        {/* LIST KARTU DEFINISI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedTerm(item)}
                className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -z-10 group-hover:bg-blue-100 transition-colors"></div>

                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-blue-700 transition-colors pr-2">
                    {item.term}
                  </h3>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-slate-200 whitespace-nowrap">
                    {item.category}
                  </span>
                </div>
                
                <div className="flex-grow space-y-3 mt-2">
                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><BookOpen className="w-3 h-3"/> ID</p>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{item.shortId}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs font-bold text-blue-400 mb-1 flex items-center gap-1"><BookOpen className="w-3 h-3"/> EN</p>
                    <p className="text-sm text-slate-500 leading-relaxed italic line-clamp-2">{item.shortEn}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-transparent flex items-center text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Baca detail <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700">Istilah tidak ditemukan</h3>
              <p className="text-slate-500 mt-2">Coba gunakan kata kunci lain untuk mencari di dalam kamus ini.</p>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-center text-slate-500 text-sm">
        <p className="font-medium">© {new Date().getFullYear()} Darrell Economics — Education Financial Literacy</p>
        <p className="text-xs mt-1 opacity-70">Sistem kamus cerdas interaktif untuk mempermudah menghafal istilah ekonomi.</p>
      </footer>

      {/* MODAL / POPUP DETAIL (Diperbaiki agar tidak tertutup konten) */}
      {selectedTerm.term && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          
          {/* Kotak Modal Diperkecil & Scrollable (max-w-2xl, max-h-[85vh]) */}
          <div 
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header & Tombol X (Selalu Terlihat) */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <LineChart className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                    {selectedTerm.term}
                  </h2>
                  <span className="inline-block mt-1 bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded border border-blue-100">
                    Kategori: {selectedTerm.category}
                  </span>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-500 rounded-full transition-colors flex-shrink-0"
                aria-label="Tutup"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Content (Scrollable Area) */}
            <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar flex-grow">
              
              {/* Bahasa Indonesia Box */}
              <div className="mb-6 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
                <div className="bg-blue-50/50 rounded-r-2xl p-5 border border-blue-100 border-l-0">
                  <h4 className="text-sm font-extrabold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-6 h-4 bg-blue-600 text-white flex items-center justify-center rounded-[3px] text-[10px]">ID</span>
                    Penjelasan Detail
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-[15px] md:text-base">
                    {selectedTerm.detailId}
                  </p>
                </div>
              </div>

              {/* English Box */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800 rounded-l-lg"></div>
                <div className="bg-slate-50 rounded-r-2xl p-5 border border-slate-200 border-l-0">
                  <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-6 h-4 bg-slate-800 text-white flex items-center justify-center rounded-[3px] text-[10px]">EN</span>
                    English Definition
                  </h4>
                  <p className="text-slate-600 leading-relaxed italic text-[15px] md:text-base">
                    "{selectedTerm.detailEn}"
                  </p>
                </div>
              </div>

            </div>
          </div>
          
          {/* Overlay klik untuk menutup */}
          <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
        </div>
      )}

      {/* Global Styles untuk Custom Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}