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
// Total: 190 Definisi
const dictionaryData = [
  // --- 1. EKONOMI DASAR (MIKRO & MAKRO) ---
  {
    term: "Scarcity", category: "Ekonomi",
    shortId: "Kondisi sumber daya terbatas untuk kebutuhan tak terbatas.", shortEn: "Condition of limited resources for unlimited wants.",
    detailId: "Kelangkaan (Scarcity) adalah masalah ekonomi mendasar karena manusia memiliki kebutuhan dan keinginan yang tidak terbatas, sedangkan sumber daya alam, tenaga kerja, dan modal yang tersedia sangat terbatas.",
    detailEn: "Scarcity is the fundamental economic problem of having seemingly unlimited human wants in a world of limited resources. It states that society has insufficient productive resources to fulfill all human wants and needs."
  },
  {
    term: "Opportunity Cost", category: "Ekonomi",
    shortId: "Biaya peluang dari alternatif terbaik yang dikorbankan.", shortEn: "The value of the next best alternative forgone.",
    detailId: "Biaya Peluang (Opportunity Cost) adalah nilai dari alternatif terbaik yang harus dikorbankan ketika seseorang membuat sebuah pilihan. Ini adalah konsep krusial dalam pengambilan keputusan ekonomi.",
    detailEn: "Opportunity cost is the potential benefit that is lost when you choose one alternative over another. It's a key concept in economics representing the true cost of any decision."
  },
  {
    term: "Ceteris Paribus", category: "Ekonomi",
    shortId: "Asumsi bahwa semua variabel lain tetap konstan.", shortEn: "Assumption that all other variables remain constant.",
    detailId: "Ceteris Paribus adalah frasa Latin yang berarti 'hal-hal lain dianggap tetap'. Dalam ilmu ekonomi, ini digunakan untuk menyederhanakan analisis dengan mengasumsikan bahwa hanya satu variabel yang berubah sementara yang lain tetap.",
    detailEn: "A Latin phrase meaning 'all other things being equal'. In economics, it acts as a shorthand indication of the effect of one economic variable on another, keeping all other variables constant."
  },
  {
    term: "Law of Demand", category: "Ekonomi",
    shortId: "Hukum Permintaan: harga naik, kuantitas diminta turun.", shortEn: "As price increases, quantity demanded decreases.",
    detailId: "Hukum Permintaan menyatakan bahwa, ceteris paribus, semakin tinggi harga suatu barang, semakin sedikit jumlah barang tersebut yang akan diminta oleh konsumen.",
    detailEn: "The law of demand states that, conditional on all else being equal, as the price of a good increases, quantity demanded decreases."
  },
  {
    term: "Law of Supply", category: "Ekonomi",
    shortId: "Hukum Penawaran: harga naik, kuantitas ditawarkan naik.", shortEn: "As price increases, quantity supplied increases.",
    detailId: "Hukum Penawaran menyatakan bahwa terdapat hubungan positif antara harga dan kuantitas yang ditawarkan. Produsen bersedia menawarkan lebih banyak barang pada harga yang lebih tinggi.",
    detailEn: "The law of supply is the microeconomic law that states that, all other factors being equal, as the price of a good or service increases, the quantity of goods or services that suppliers offer will increase."
  },
  {
    term: "Marginal Utility", category: "Ekonomi",
    shortId: "Tambahan kepuasan dari konsumsi satu unit tambahan.", shortEn: "Additional satisfaction from consuming one more unit.",
    detailId: "Utilitas Marginal adalah kepuasan atau manfaat tambahan yang diperoleh konsumen dengan mengonsumsi satu unit tambahan dari suatu barang atau jasa.",
    detailEn: "Marginal utility is the added satisfaction a consumer gets from having one more unit of a good or service."
  },
  {
    term: "Law of Diminishing Marginal Utility", category: "Ekonomi",
    shortId: "Tambahan kepuasan yang semakin menurun.", shortEn: "Decreasing added satisfaction from extra consumption.",
    detailId: "Hukum Utilitas Marginal yang Semakin Menurun (Hukum Gossen I) menyatakan bahwa semakin banyak unit barang yang dikonsumsi, tambahan kepuasan (utilitas marginal) dari unit berikutnya akan semakin menurun.",
    detailEn: "The law of diminishing marginal utility states that the marginal utility of a good or service declines as its available supply increases."
  },
  {
    term: "Indifference Curve", category: "Ekonomi",
    shortId: "Kurva yang menunjukkan kombinasi barang dengan kepuasan sama.", shortEn: "Curve showing combinations of goods giving equal satisfaction.",
    detailId: "Kurva Indiferensi adalah kurva yang menghubungkan titik-titik kombinasi dari dua barang atau jasa yang memberikan tingkat kepuasan (utilitas) yang sama kepada konsumen.",
    detailEn: "An indifference curve shows a combination of two goods that give a consumer equal satisfaction and utility, thereby making the consumer indifferent."
  },
  {
    term: "Price Ceiling", category: "Ekonomi",
    shortId: "Batas harga tertinggi yang ditetapkan pemerintah.", shortEn: "Maximum legal price set by the government.",
    detailId: "Price Ceiling atau Harga Eceran Tertinggi adalah harga maksimum yang sah yang diizinkan untuk dijual atas suatu barang atau jasa, biasanya bertujuan untuk melindungi konsumen.",
    detailEn: "A price ceiling is a government-imposed price control, or limit, on how high a price is charged for a product."
  },
  {
    term: "Price Floor", category: "Ekonomi",
    shortId: "Batas harga terendah yang ditetapkan pemerintah.", shortEn: "Minimum legal price set by the government.",
    detailId: "Price Floor atau Harga Dasar Minimum adalah batas bawah yang ditetapkan pemerintah terhadap harga suatu barang atau jasa, biasanya untuk melindungi produsen (seperti UMP untuk tenaga kerja).",
    detailEn: "A price floor is a government- or group-imposed price control or limit on how low a price can be charged for a product, good, commodity, or service."
  },
  {
    term: "Gross Domestic Product (GDP)", category: "Ekonomi",
    shortId: "Total nilai barang & jasa yang diproduksi di suatu negara.", shortEn: "Total value of goods & services produced within a country.",
    detailId: "Produk Domestik Bruto (PDB) adalah nilai pasar dari semua barang dan jasa akhir yang diproduksi di dalam batas wilayah suatu negara selama periode tertentu.",
    detailEn: "Gross Domestic Product is the total monetary or market value of all the finished goods and services produced within a country's borders in a specific time period."
  },
  {
    term: "Gross National Product (GNP)", category: "Ekonomi",
    shortId: "Total nilai barang & jasa yang diproduksi oleh warga negara.", shortEn: "Total value of goods produced by a country's citizens.",
    detailId: "Produk Nasional Bruto (PNB) adalah total nilai barang dan jasa akhir yang diproduksi oleh warga negara suatu negara, baik yang berada di dalam negeri maupun di luar negeri.",
    detailEn: "Gross National Product is an estimate of total value of all the final products and services turned out in a given period by the means of production owned by a country's residents."
  },
  {
    term: "Price Elasticity of Demand", category: "Ekonomi",
    shortId: "Tingkat kepekaan permintaan terhadap perubahan harga.", shortEn: "Responsiveness of quantity demanded to a change in price.",
    detailId: "Elastisitas Harga Permintaan mengukur seberapa besar jumlah barang yang diminta berubah ketika harga barang tersebut mengalami perubahan.",
    detailEn: "Price elasticity of demand is a measure used in economics to show the responsiveness, or elasticity, of the quantity demanded of a good or service to a change in its price."
  },
  {
    term: "Monopoly", category: "Ekonomi",
    shortId: "Struktur pasar dengan hanya satu penjual.", shortEn: "Market structure characterized by a single seller.",
    detailId: "Monopoli adalah struktur pasar di mana satu penjual atau produsen mendominasi seluruh pasar untuk suatu barang atau jasa yang tidak memiliki substitusi terdekat.",
    detailEn: "A monopoly is a market structure where a single seller or producer assumes a dominant position in an industry or a sector."
  },
  {
    term: "Oligopoly", category: "Ekonomi",
    shortId: "Struktur pasar yang didominasi oleh segelintir perusahaan.", shortEn: "Market structure dominated by a small number of firms.",
    detailId: "Oligopoli adalah struktur pasar di mana sejumlah kecil perusahaan besar mendominasi pasar, sering kali menyebabkan ketergantungan strategis antar perusahaan.",
    detailEn: "An oligopoly is a market structure in which a market or industry is dominated by a small number of large sellers or producers."
  },
  {
    term: "Perfect Competition", category: "Ekonomi",
    shortId: "Pasar persaingan sempurna dengan banyak pembeli & penjual.", shortEn: "Market with many buyers and sellers of identical products.",
    detailId: "Persaingan Sempurna adalah struktur pasar teoretis di mana terdapat banyak pembeli dan penjual, produk bersifat homogen, dan tidak ada satu entitas pun yang dapat memengaruhi harga.",
    detailEn: "Perfect competition is a theoretical market structure in which all firms sell an identical product, market share does not influence price, and buyers have complete information."
  },
  {
    term: "Monopolistic Competition", category: "Ekonomi",
    shortId: "Banyak penjual dengan produk yang dapat dibedakan.", shortEn: "Many sellers offering differentiated products.",
    detailId: "Persaingan Monopolistik adalah jenis persaingan di mana banyak produsen menjual produk yang berbeda satu sama lain (diferensiasi produk) sehingga mereka bukan substitusi sempurna.",
    detailEn: "Monopolistic competition is a type of imperfect competition such that many producers sell products that are differentiated from one another (e.g. by branding or quality)."
  },
  {
    term: "Deadweight Loss", category: "Ekonomi",
    shortId: "Kerugian efisiensi ekonomi akibat inefisiensi pasar.", shortEn: "Loss of economic efficiency due to market inefficiency.",
    detailId: "Deadweight Loss (Kerugian Beban Baku) adalah kerugian surplus ekonomi (konsumen dan produsen) yang terjadi akibat inefisiensi pasar, seperti pajak, subsidi, atau monopoli.",
    detailEn: "A deadweight loss is a cost to society created by market inefficiency, which occurs when supply and demand are out of equilibrium."
  },
  {
    term: "Externality", category: "Ekonomi",
    shortId: "Dampak pihak ketiga dari suatu aktivitas ekonomi.", shortEn: "Third-party effect from an economic activity.",
    detailId: "Eksternalitas adalah biaya atau manfaat yang ditanggung atau diterima oleh pihak ketiga yang tidak terlibat langsung dalam suatu transaksi ekonomi (misalnya polusi sebagai eksternalitas negatif).",
    detailEn: "An externality is a cost or benefit caused by a producer that is not financially incurred or received by that producer."
  },
  {
    term: "Public Goods", category: "Ekonomi",
    shortId: "Barang yang non-eksklusif dan non-rival dalam konsumsi.", shortEn: "Goods that are non-excludable and non-rivalrous.",
    detailId: "Barang Publik adalah barang atau jasa yang disediakan tanpa keuntungan bagi semua anggota masyarakat, ditandai dengan sifat tidak dapat dikecualikan (non-excludable) dan konsumsinya tidak bersaing (non-rivalrous).",
    detailEn: "A public good is a product that one individual can consume without reducing its availability to another individual, and from which no one is excluded."
  },
  {
    term: "Free Rider Problem", category: "Ekonomi",
    shortId: "Masalah orang yang menikmati manfaat tanpa membayar.", shortEn: "Burden on a shared resource by individuals who aren't paying.",
    detailId: "Masalah Penumpang Gelap (Free Rider Problem) adalah situasi inefisiensi pasar di mana individu menikmati manfaat dari barang publik atau sumber daya kolektif tanpa berkontribusi pada biayanya.",
    detailEn: "The free rider problem is the burden on a shared resource that is created by its use or overuse by people who aren't paying their fair share for it or aren't paying anything at all."
  },
  {
    term: "Comparative Advantage", category: "Ekonomi",
    shortId: "Kemampuan memproduksi dengan biaya peluang lebih rendah.", shortEn: "Ability to produce goods at a lower opportunity cost.",
    detailId: "Keunggulan Komparatif adalah kemampuan ekonomi suatu negara untuk memproduksi barang atau jasa pada tingkat biaya peluang (opportunity cost) yang lebih rendah dibandingkan negara lain.",
    detailEn: "Comparative advantage is an economy's ability to produce a particular good or service at a lower opportunity cost than its trading partners."
  },
  {
    term: "Absolute Advantage", category: "Ekonomi",
    shortId: "Kemampuan memproduksi lebih banyak dengan sumber daya sama.", shortEn: "Ability to produce more with the same resources.",
    detailId: "Keunggulan Mutlak merujuk pada kemampuan suatu pihak (individu, perusahaan, atau negara) untuk memproduksi kuantitas barang yang lebih besar dengan jumlah input yang sama dibandingkan pihak lain.",
    detailEn: "Absolute advantage is the ability of an individual, company, region, or country to produce a greater quantity of a good, product, or service with the same quantity of inputs per unit of time."
  },
  {
    term: "Production Possibility Frontier (PPF)", category: "Ekonomi",
    shortId: "Kurva batas kemungkinan produksi dua komoditas.", shortEn: "Curve showing maximum possible output of two commodities.",
    detailId: "Batas Kemungkinan Produksi (PPF) adalah kurva grafis yang menunjukkan semua kemungkinan kombinasi produksi dua barang atau jasa yang dapat diproduksi secara efisien menggunakan sumber daya yang ada.",
    detailEn: "The production possibility frontier is a curve illustrating the varying amounts of two products that can be produced when both depend on the same finite resources."
  },
  {
    term: "Gini Coefficient", category: "Ekonomi",
    shortId: "Indikator tingkat ketimpangan distribusi pendapatan.", shortEn: "Measure of income inequality within a nation.",
    detailId: "Rasio Gini adalah ukuran statistik yang merepresentasikan ketimpangan pendapatan atau kekayaan dalam suatu negara atau kelompok sosial. Nilai 0 berarti kesetaraan sempurna, dan 1 ketimpangan sempurna.",
    detailEn: "The Gini index or Gini coefficient is a statistical measure of economic inequality in a population. It measures the dispersion of income or wealth."
  },
  {
    term: "Stagflation", category: "Ekonomi",
    shortId: "Kondisi inflasi tinggi yang disertai stagnasi ekonomi.", shortEn: "High inflation combined with economic stagnation.",
    detailId: "Stagflasi adalah periode ekonomi yang ditandai dengan inflasi yang tinggi (kenaikan harga) yang terjadi bersamaan dengan pertumbuhan ekonomi yang lambat dan tingkat pengangguran yang tinggi.",
    detailEn: "Stagflation is an economic cycle characterized by slow growth and a high unemployment rate accompanied by inflation."
  },
  {
    term: "Aggregate Demand", category: "Ekonomi",
    shortId: "Total permintaan untuk seluruh barang & jasa dalam perekonomian.", shortEn: "Total demand for all finished goods and services.",
    detailId: "Permintaan Agregat adalah jumlah total permintaan ekonomi untuk semua barang jadi dan jasa pada tingkat harga tertentu dan dalam jangka waktu tertentu.",
    detailEn: "Aggregate demand is an economic measurement of the total amount of demand for all finished goods and services produced in an economy."
  },

  // --- 2. PASAR MODAL, INVESTASI & TRADING ---
  {
    term: "Stock (Saham)", category: "Pasar Modal",
    shortId: "Bukti kepemilikan sebagian dari suatu perusahaan.", shortEn: "A fraction of ownership in a corporation.",
    detailId: "Saham adalah instrumen pasar keuangan yang berupa surat berharga tanda penyertaan modal seseorang atau pihak dalam suatu perusahaan.",
    detailEn: "A stock is a security that represents the ownership of a fraction of a corporation."
  },
  {
    term: "Bond (Obligasi)", category: "Pasar Modal",
    shortId: "Surat utang jangka menengah atau panjang.", shortEn: "A fixed-income instrument representing a loan.",
    detailId: "Obligasi adalah surat utang jangka menengah maupun jangka panjang yang dapat diperjualbelikan dengan janji pembayaran bunga berkala.",
    detailEn: "A bond is a fixed-income instrument that represents a loan made by an investor to a borrower."
  },
  {
    term: "Mutual Fund (Reksadana)", category: "Pasar Modal",
    shortId: "Wadah kumpulan dana investor yang dikelola manajer investasi.", shortEn: "A pool of money managed by professionals.",
    detailId: "Reksadana adalah wadah yang dipergunakan untuk menghimpun dana dari masyarakat pemodal untuk diinvestasikan dalam portofolio efek oleh Manajer Investasi.",
    detailEn: "A mutual fund is a company that pools money from many investors and invests the money in securities."
  },
  {
    term: "Sukuk", category: "Pasar Modal",
    shortId: "Sertifikat bernilai setara yang mewakili porsi kepemilikan (Syariah).", shortEn: "Islamic financial certificate, similar to a bond.",
    detailId: "Sukuk adalah efek syariah berupa sertifikat bukti kepemilikan aset berwujud atau hak manfaat sesuai hukum Syariah.",
    detailEn: "Sukuk is the Islamic equivalent of bonds, structured to comply with Sharia law."
  },
  {
    term: "Initial Public Offering (IPO)", category: "Pasar Modal",
    shortId: "Penawaran saham perdana perusahaan kepada publik.", shortEn: "The first sale of stock by a company to the public.",
    detailId: "IPO adalah proses di mana sebuah perusahaan swasta menawarkan sahamnya kepada publik untuk pertama kalinya agar dapat diperdagangkan di bursa efek.",
    detailEn: "An initial public offering (IPO) refers to the process of offering shares of a private corporation to the public."
  },
  {
    term: "Bull Market", category: "Pasar Modal",
    shortId: "Kondisi pasar keuangan yang sedang mengalami tren naik.", shortEn: "A financial market condition where prices are rising.",
    detailId: "Bull Market menggambarkan kondisi pasar saham yang sedang mengalami tren kenaikan harga secara berkelanjutan didorong optimisme.",
    detailEn: "A bull market is the condition of a financial market in which prices are rising or are expected to rise."
  },
  {
    term: "Bear Market", category: "Pasar Modal",
    shortId: "Kondisi pasar keuangan yang sedang mengalami tren turun.", shortEn: "A financial market condition where prices are falling.",
    detailId: "Bear Market adalah kondisi pasar yang mengalami tren penurunan harga secara terus-menerus (biasanya melebihi 20%) akibat pesimisme pasar.",
    detailEn: "A bear market is when a market experiences prolonged price declines."
  },
  {
    term: "Dividend", category: "Pasar Modal",
    shortId: "Pembagian sebagian laba perusahaan kepada pemegang saham.", shortEn: "A distribution of a portion of a company's earnings.",
    detailId: "Dividen adalah pembagian sebagian laba perusahaan kepada para pemegang saham, ditetapkan oleh dewan direksi.",
    detailEn: "A dividend is the distribution of some of a company's earnings to its shareholders."
  },
  {
    term: "Capital Gain", category: "Investasi",
    shortId: "Keuntungan dari kenaikan harga aset atau investasi.", shortEn: "Profit from the increase in value of an asset.",
    detailId: "Capital Gain adalah keuntungan finansial yang diperoleh ketika sebuah aset dijual dengan harga yang lebih tinggi daripada harga belinya.",
    detailEn: "A capital gain is the increase in a capital asset's value realized when the asset is sold."
  },
  {
    term: "Diversification", category: "Investasi",
    shortId: "Membagi dana ke berbagai jenis aset untuk mengurangi risiko.", shortEn: "Spreading investments around to reduce exposure to risk.",
    detailId: "Diversifikasi adalah strategi manajemen risiko dengan mencampur berbagai jenis investasi di dalam sebuah portofolio.",
    detailEn: "Diversification is a risk management strategy that mixes a wide variety of investments within a portfolio."
  },
  {
    term: "Blue Chip", category: "Pasar Modal",
    shortId: "Saham dari perusahaan besar, mapan, dan stabil secara finansial.", shortEn: "Stock of a large, well-established, financially sound company.",
    detailId: "Saham Blue Chip adalah saham dari perusahaan terkemuka yang bereputasi nasional, memiliki sejarah pendapatan dan pembayaran dividen yang stabil.",
    detailEn: "A blue-chip stock is a huge company with an excellent reputation, operating for many years with dependable earnings."
  },
  {
    term: "Penny Stock", category: "Investasi",
    shortId: "Saham perusahaan kecil dengan harga sangat murah dan risiko tinggi.", shortEn: "Low-priced, highly speculative stock of a small company.",
    detailId: "Penny Stock (Saham Gocap/Receh) adalah saham dengan kapitalisasi pasar sangat kecil yang diperdagangkan dengan harga sangat murah dan memiliki volatilitas ekstrem.",
    detailEn: "Penny stocks typically trade for extremely low prices, issued by small companies, and are considered highly speculative."
  },
  {
    term: "Market Capitalization", category: "Pasar Modal",
    shortId: "Total nilai pasar dari seluruh saham beredar perusahaan.", shortEn: "Total market value of a company's outstanding shares.",
    detailId: "Kapitalisasi Pasar (Market Cap) adalah total nilai pasar dari seluruh saham beredar perusahaan, dihitung dengan mengalikan harga saham saat ini dengan total saham.",
    detailEn: "Market capitalization is the total dollar market value of a company's outstanding shares of stock."
  },
  {
    term: "Price-to-Earnings Ratio (P/E)", category: "Investasi",
    shortId: "Rasio valuasi harga saham dibanding laba per saham.", shortEn: "Ratio valuing a company current share price relative to EPS.",
    detailId: "P/E Ratio adalah rasio untuk menilai perusahaan yang mengukur harga saham saat ini relatif terhadap pendapatan/laba per saham (EPS).",
    detailEn: "The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures its current share price relative to its earnings per share."
  },
  {
    term: "Return on Investment (ROI)", category: "Investasi",
    shortId: "Metrik profitabilitas mengevaluasi efisiensi investasi.", shortEn: "Performance measure to evaluate the efficiency of an investment.",
    detailId: "ROI (Uji Pengembalian Investasi) adalah rasio keuangan yang digunakan untuk menghitung manfaat yang diterima investor relatif terhadap biaya investasinya.",
    detailEn: "Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment."
  },
  {
    term: "Return on Equity (ROE)", category: "Investasi",
    shortId: "Ukuran kinerja keuangan berdasarkan laba bersih per ekuitas.", shortEn: "Measure of financial performance based on net income to equity.",
    detailId: "ROE mengukur kemampuan perusahaan menghasilkan laba bersih dari modal (ekuitas) yang disetorkan oleh para pemegang saham.",
    detailEn: "Return on equity (ROE) is the measure of a company's net income divided by its shareholders' equity."
  },
  {
    term: "Volatility", category: "Trading",
    shortId: "Tingkat fluktuasi harga instrumen keuangan dari waktu ke waktu.", shortEn: "Rate at which the price of a security increases or decreases.",
    detailId: "Volatilitas adalah ukuran seberapa sering dan seberapa drastis harga suatu aset atau pasar keuangan berfluktuasi/berubah naik turun.",
    detailEn: "Volatility is a statistical measure of the dispersion of returns for a given security or market index."
  },
  {
    term: "Liquidity", category: "Investasi",
    shortId: "Kemudahan sebuah aset diubah menjadi uang tunai.", shortEn: "How easily an asset can be converted into ready cash.",
    detailId: "Likuiditas menggambarkan tingkat kemudahan suatu aset atau surat berharga untuk dibeli atau dijual di pasar tanpa memengaruhi harga pasarnya secara signifikan.",
    detailEn: "Liquidity refers to the ease with which an asset, or security, can be converted into ready cash without affecting its market price."
  },
  {
    term: "Derivative", category: "Trading",
    shortId: "Kontrak keuangan yang nilainya bergantung pada aset acuan.", shortEn: "A contract whose value is derived from an underlying asset.",
    detailId: "Derivatif adalah instrumen keuangan atau kontrak antara dua pihak atau lebih yang nilainya diturunkan dari kinerja aset acuan yang mendasarinya (seperti saham atau emas).",
    detailEn: "A derivative is a financial security with a value that is reliant upon or derived from, an underlying asset or group of assets."
  },
  {
    term: "Futures Contract", category: "Trading",
    shortId: "Kontrak beli/jual aset di masa depan pada harga yang disepakati.", shortEn: "Agreement to buy/sell an asset at a future date at an agreed price.",
    detailId: "Kontrak Berjangka (Futures) adalah perjanjian hukum untuk membeli atau menjual komoditas atau instrumen keuangan tertentu pada harga yang disepakati saat ini, untuk diserahkan di masa depan.",
    detailEn: "Futures are derivative financial contracts that obligate the parties to transact an asset at a predetermined future date and price."
  },
  {
    term: "Option", category: "Trading",
    shortId: "Hak (bukan kewajiban) membeli/menjual aset pada harga tertentu.", shortEn: "Right to buy or sell an asset at a set price.",
    detailId: "Opsi adalah instrumen derivatif yang memberikan hak, namun bukan kewajiban, kepada pembelinya untuk membeli (call) atau menjual (put) aset acuan pada harga tertentu di waktu yang ditentukan.",
    detailEn: "Options are financial derivatives that give buyers the right, but not the obligation, to buy or sell an underlying asset at an agreed-upon price."
  },
  {
    term: "Short Selling", category: "Trading",
    shortId: "Jual kosong aset yang dipinjam dengan harapan harganya turun.", shortEn: "Selling a borrowed security expecting it to decline in value.",
    detailId: "Short Selling adalah strategi perdagangan spekulatif di mana investor meminjam saham dan langsung menjualnya, dengan harapan membelinya kembali nanti di harga yang lebih rendah.",
    detailEn: "Short selling is an investment or trading strategy that speculates on the decline in a stock or other security's price."
  },
  {
    term: "Margin Trading", category: "Trading",
    shortId: "Trading menggunakan dana pinjaman dari broker.", shortEn: "Trading using funds borrowed from a broker.",
    detailId: "Margin Trading adalah praktik meminjam dana dari broker keuangan untuk membeli aset keuangan, dengan menggunakan aset di akun sebagai jaminan (leverage tinggi).",
    detailEn: "Margin trading refers to the practice of using borrowed funds from a broker to trade a financial asset, which forms the collateral for the loan."
  },
  {
    term: "Stop-Loss Order", category: "Trading",
    shortId: "Perintah jual otomatis jika harga mencapai batas rugi tertentu.", shortEn: "Order placed to sell a security when it reaches a certain price.",
    detailId: "Stop Loss adalah instruksi otomatis yang dipasang trader kepada broker untuk menjual sekuritas jika harganya turun ke level tertentu, guna membatasi kerugian.",
    detailEn: "A stop-loss order is an order placed with a broker to buy or sell a specific stock once the stock reaches a certain price, designed to limit loss."
  },
  {
    term: "Technical Analysis", category: "Trading",
    shortId: "Analisis prediksi harga masa depan melalui grafik dan data historis.", shortEn: "Evaluating investments by analyzing statistics generated by market activity.",
    detailId: "Analisis Teknikal adalah metode analisis yang digunakan untuk mengevaluasi investasi dan mengidentifikasi peluang trading dengan menganalisis tren statistik dari aktivitas perdagangan, seperti pergerakan harga dan volume.",
    detailEn: "Technical analysis is a trading discipline employed to evaluate investments and identify trading opportunities by analyzing statistical trends gathered from trading activity."
  },
  {
    term: "Fundamental Analysis", category: "Investasi",
    shortId: "Evaluasi nilai intrinsik aset dengan menguji ekonomi dan finansial.", shortEn: "Evaluating a security's intrinsic value by examining related economic factors.",
    detailId: "Analisis Fundamental adalah metode evaluasi nilai intrinsik suatu aset (saham) dengan menganalisis faktor ekonomi makro, mikro, hingga kondisi finansial perusahaan secara mendalam.",
    detailEn: "Fundamental analysis is a method of determining a stock's real or fair market value by examining related economic and financial factors."
  },
  {
    term: "Candlestick Chart", category: "Trading",
    shortId: "Grafik harga yang menampilkan pembukaan, penutupan, tinggi, dan rendah.", shortEn: "Price chart showing open, close, high, and low data.",
    detailId: "Grafik Candlestick adalah gaya bagan harga keuangan yang digunakan untuk mendeskripsikan pergerakan harga sekuritas, derivatif, atau mata uang, menunjukkan rentang waktu OHLC (Open, High, Low, Close).",
    detailEn: "A candlestick is a type of price chart used in technical analysis that displays the high, low, open, and closing prices of a security for a specific period."
  },
  {
    term: "Moving Average (MA)", category: "Trading",
    shortId: "Indikator tren yang meratakan pergerakan harga.", shortEn: "Trend indicator that smooths out price action.",
    detailId: "Moving Average adalah indikator analisis teknikal yang meratakan pergerakan harga dengan menyaring fluktuasi jangka pendek, menunjukkan arah tren aset.",
    detailEn: "A moving average is a widely used technical indicator that smooths out price trends by filtering out the noise from random short-term price fluctuations."
  },
  {
    term: "Relative Strength Index (RSI)", category: "Trading",
    shortId: "Indikator momentum untuk melihat overbought atau oversold.", shortEn: "Momentum indicator evaluating overbought/oversold conditions.",
    detailId: "RSI adalah osilator momentum yang mengukur kecepatan dan perubahan pergerakan harga. Jika di atas 70 aset dianggap overbought, jika di bawah 30 dianggap oversold.",
    detailEn: "The relative strength index (RSI) is a momentum indicator used in technical analysis that measures the magnitude of recent price changes."
  },
  {
    term: "Support Level", category: "Trading",
    shortId: "Level harga bawah di mana tren turun cenderung berhenti.", shortEn: "Price level where a downtrend tends to pause due to demand.",
    detailId: "Level Support adalah batas psikologis dan teknis harga di bagian bawah grafik di mana minat beli (permintaan) cukup kuat untuk mengatasi tekanan jual.",
    detailEn: "Support is a price level where a downtrend tends to pause due to a concentration of demand or buying interest."
  },
  {
    term: "Resistance Level", category: "Trading",
    shortId: "Level harga atas di mana tren naik cenderung tertahan.", shortEn: "Price level where an uptrend tends to pause due to selling.",
    detailId: "Level Resistance adalah batas atas yang mencegah harga aset bergerak lebih tinggi. Di titik ini, ada kelebihan penjual di pasar yang menekan harga kembali turun.",
    detailEn: "Resistance is a price level where an uptrend tends to pause due to a concentration of supply or selling interest."
  },

  // --- 3. PASAR UANG (MONEY MARKET) & CURRENCY ---
  {
    term: "Money Market", category: "Pasar Uang",
    shortId: "Pasar untuk instrumen utang jangka pendek (< 1 tahun).", shortEn: "Market for short-term debt instruments (under 1 year).",
    detailId: "Pasar Uang adalah tempat pertemuan antara pihak yang surplus dana dengan pihak yang defisit dana untuk memperdagangkan instrumen keuangan berjangka sangat pendek.",
    detailEn: "The money market refers to trading in very short-term debt investments."
  },
  {
    term: "Commercial Paper", category: "Pasar Uang",
    shortId: "Surat utang jangka pendek tanpa agunan dari korporasi.", shortEn: "Unsecured, short-term corporate debt.",
    detailId: "Commercial Paper adalah instrumen utang tanpa agunan yang diterbitkan oleh perusahaan untuk memenuhi modal kerja jangka pendek.",
    detailEn: "Commercial paper is an unsecured, short-term debt instrument issued by a corporation."
  },
  {
    term: "Certificate of Deposit (CD)", category: "Pasar Uang",
    shortId: "Deposito berjangka yang dapat dipindahtangankan.", shortEn: "A time deposit that can be transferred or sold.",
    detailId: "Sertifikat Deposito adalah simpanan deposito yang bukti simpanannya dapat diperjualbelikan di pasar uang sebelum jatuh tempo.",
    detailEn: "A certificate of deposit is a product providing an interest rate premium in exchange for leaving a deposit untouched."
  },
  {
    term: "Repurchase Agreement (Repo)", category: "Pasar Uang",
    shortId: "Penjualan surat berharga dengan janji membeli kembali.", shortEn: "Sale of securities with an agreement to repurchase.",
    detailId: "Repo adalah transaksi penjualan surat berharga (biasanya obligasi pemerintah) dengan komitmen untuk membelinya kembali di kemudian hari.",
    detailEn: "A repurchase agreement is a form of short-term borrowing for dealers in government securities."
  },
  {
    term: "Treasury Bill (T-Bill)", category: "Pasar Uang",
    shortId: "Surat utang jangka pendek yang diterbitkan pemerintah.", shortEn: "Short-term government debt obligation.",
    detailId: "T-Bill atau SPN (Surat Perbendaharaan Negara) adalah instrumen utang pemerintah jangka pendek yang jatuh temponya kurang dari setahun, dianggap sebagai aset bebas risiko (risk-free).",
    detailEn: "A Treasury Bill (T-Bill) is a short-term U.S. government debt obligation backed by the Treasury Department with a maturity of one year or less."
  },
  {
    term: "Forex Market", category: "Currency",
    shortId: "Pasar global terdesentralisasi untuk memperdagangkan mata uang asing.", shortEn: "Global market for trading currencies.",
    detailId: "Foreign Exchange (Forex) Market adalah pasar terbesar di dunia yang memfasilitasi pertukaran dan perdagangan mata uang antarnegara 24 jam sehari (Senin-Jumat).",
    detailEn: "The foreign exchange market is a global decentralized or over-the-counter market for the trading of currencies."
  },
  {
    term: "Exchange Rate (Kurs)", category: "Currency",
    shortId: "Harga sebuah mata uang terhadap mata uang negara lain.", shortEn: "The value of one currency for the purpose of conversion.",
    detailId: "Nilai tukar (kurs) adalah rasio harga di mana satu mata uang dapat ditukar dengan mata uang negara lain.",
    detailEn: "An exchange rate is the rate at which one currency will be exchanged for another currency."
  },
  {
    term: "Appreciation", category: "Currency",
    shortId: "Kenaikan nilai mata uang melalui mekanisme pasar bebas.", shortEn: "An increase in the value of a currency.",
    detailId: "Apresiasi adalah penguatan alamiah dari sebuah mata uang domestik terhadap mata uang asing akibat tingginya permintaan valuta tersebut di pasar.",
    detailEn: "Appreciation is an increase in the value of one currency relative to another in the foreign exchange markets."
  },
  {
    term: "Depreciation", category: "Currency",
    shortId: "Penurunan nilai mata uang melalui mekanisme pasar bebas.", shortEn: "A decrease in the value of a currency.",
    detailId: "Depresiasi valuta asing adalah pelemahan nilai mata uang suatu negara akibat penawaran yang berlebihan atau permintaan yang lemah di pasar forex.",
    detailEn: "Currency depreciation is the loss of value of a country's currency with respect to foreign reference currencies."
  },
  {
    term: "Devaluation", category: "Currency",
    shortId: "Penurunan disengaja nilai mata uang oleh pemerintah.", shortEn: "Deliberate downward adjustment of a currency's value.",
    detailId: "Devaluasi adalah kebijakan moneter bank sentral atau pemerintah untuk memangkas nilai tukar mata uang resminya secara paksa dalam sistem kurs tetap, untuk mendorong ekspor.",
    detailEn: "Devaluation is the deliberate downward adjustment of the value of a country's money relative to another currency."
  },
  {
    term: "Revaluation", category: "Currency",
    shortId: "Kenaikan disengaja nilai mata uang oleh pemerintah.", shortEn: "Deliberate upward adjustment of a currency's value.",
    detailId: "Revaluasi adalah langkah kebijakan di mana bank sentral menaikkan nilai mata uang domestiknya terhadap mata uang asing secara resmi di bawah rezim nilai tukar tetap.",
    detailEn: "Revaluation is a calculated upward adjustment to a country's official exchange rate relative to a chosen baseline."
  },
  {
    term: "Currency Pair", category: "Trading",
    shortId: "Kutipan harga dua mata uang yang berbeda yang diperdagangkan.", shortEn: "The quotation of two different currencies.",
    detailId: "Pasangan Mata Uang adalah struktur harga (seperti EUR/USD) di mana nilai satu mata uang (base currency) dikutip terhadap mata uang lainnya (quote currency).",
    detailEn: "A currency pair is the quotation of two different currencies, with the value of one currency being quoted against the other."
  },
  {
    term: "Pip", category: "Trading",
    shortId: "Unit ukur terkecil dari perubahan harga mata uang asing.", shortEn: "Smallest price change that a given exchange rate can make.",
    detailId: "Pip (Percentage in Point) adalah satuan dasar terkecil dari fluktuasi harga pasangan mata uang di pasar forex, biasanya di desimal ke-4 (contoh 0.0001).",
    detailEn: "A pip is an acronym for 'percentage in point' or 'price interest point'. It represents the smallest whole unit price move that an exchange rate can make."
  },
  {
    term: "Spread", category: "Trading",
    shortId: "Selisih antara harga penawaran (bid) dan permintaan (ask).", shortEn: "Difference between the bid and ask price.",
    detailId: "Spread dalam pasar keuangan adalah perbedaan selisih poin antara harga tertinggi yang bersedia dibayar pembeli (bid) dengan harga terendah yang diterima penjual (ask).",
    detailEn: "A spread is the difference between the bid and the ask price of a security or asset."
  },
  {
    term: "Arbitrage", category: "Trading",
    shortId: "Membeli & menjual aset bersamaan untuk untung selisih harga.", shortEn: "Simultaneous buy & sell of an asset to profit from price diff.",
    detailId: "Arbitrase adalah praktik eksploitasi selisih harga dari instrumen atau mata uang yang sama di dua pasar atau bursa yang berbeda secara bersamaan untuk menghasilkan keuntungan tanpa risiko.",
    detailEn: "Arbitrage is the simultaneous purchase and sale of the same asset in different markets in order to profit from tiny differences in the asset's listed price."
  },
  {
    term: "Fiat Money", category: "Currency",
    shortId: "Uang kertas pemerintah yang tidak disokong komoditas fisik.", shortEn: "Government-issued currency not backed by a commodity.",
    detailId: "Uang Fiat adalah mata uang sah (seperti Rupiah atau Dolar) yang ditetapkan oleh pemerintah dan tidak memiliki nilai intrinsik serta tidak didukung oleh emas atau perak.",
    detailEn: "Fiat money is a government-issued currency that is not backed by a physical commodity, such as gold or silver, but rather by the government that issued it."
  },
  {
    term: "Commodity Money", category: "Currency",
    shortId: "Uang yang nilainya berasal dari bahan pembuatnya (emas/perak).", shortEn: "Money whose value comes from the commodity of which it is made.",
    detailId: "Uang Komoditas adalah mata uang yang nilainya berasal dari komoditas bahan pembuat mata uang tersebut. Contoh klasiknya adalah koin emas, perak, atau tembaga.",
    detailEn: "Commodity money is money whose value comes from a commodity of which it is made. Examples include gold, silver, copper, salt."
  },

  // --- 4. KEBIJAKAN MONETER & FISKAL ---
  {
    term: "Monetary Policy", category: "Kebijakan Moneter",
    shortId: "Kebijakan bank sentral mengatur suplai uang dan suku bunga.", shortEn: "Central bank policy managing money supply and interest rates.",
    detailId: "Kebijakan Moneter adalah keputusan strategis bank sentral untuk mengendalikan inflasi dan stabilitas ekonomi dengan mengatur jumlah uang beredar dan tingkat suku bunga diskonto.",
    detailEn: "Monetary policy is the macroeconomic policy laid down by the central bank. It involves management of money supply and interest rate."
  },
  {
    term: "Fiscal Policy", category: "Kebijakan Fiskal",
    shortId: "Kebijakan pemerintah terkait pajak dan pengeluaran negara.", shortEn: "Government policy regarding taxation and spending.",
    detailId: "Kebijakan Fiskal adalah instrumen kebijakan makroekonomi yang dikendalikan pemerintah eksekutif untuk memengaruhi perekonomian melalui belanja negara (G) dan pengenaan pajak (T).",
    detailEn: "Fiscal policy is the use of government spending and taxation to influence the economy."
  },
  {
    term: "BI Rate / BI 7-Day Repo Rate", category: "Kebijakan Moneter",
    shortId: "Suku bunga acuan yang ditetapkan Bank Indonesia.", shortEn: "The benchmark interest rate set by Bank Indonesia.",
    detailId: "BI 7-Day Reverse Repo Rate adalah suku bunga acuan utama yang ditetapkan bulanan oleh Bank Indonesia untuk mengendalikan laju inflasi dan menjaga stabilitas nilai tukar Rupiah.",
    detailEn: "The BI Rate or BI 7-Day Reverse Repo Rate is the policy interest rate that reflects the monetary policy stance established by Bank Indonesia."
  },
  {
    term: "Open Market Operations", category: "Kebijakan Moneter",
    shortId: "Jual beli surat berharga oleh bank sentral di pasar terbuka.", shortEn: "Central bank buying/selling of securities to manage money supply.",
    detailId: "Operasi Pasar Terbuka (OPT) adalah kegiatan bank sentral menjual SBN (untuk menyerap likuiditas) atau membeli SBN (untuk memompa dana) guna memengaruhi pasokan uang.",
    detailEn: "Open market operations refers to the central bank practice of buying and selling government securities in the open market to regulate the money supply."
  },
  {
    term: "Reserve Requirement (GWM)", category: "Kebijakan Moneter",
    shortId: "Persentase dana nasabah wajib yang ditahan bank komersial.", shortEn: "Percentage of deposits banks must keep at the central bank.",
    detailId: "Giro Wajib Minimum (GWM) adalah rasio dana yang harus disimpan oleh bank umum di Bank Indonesia. Jika dinaikkan, bank akan mengurangi penyaluran kredit (mengerem inflasi).",
    detailEn: "The reserve requirement is the portion of reservable liabilities that commercial banks must hold onto, rather than lend out."
  },
  {
    term: "Budget Deficit", category: "Kebijakan Fiskal",
    shortId: "Kondisi pengeluaran pemerintah melebihi penerimaan pajak.", shortEn: "When government spending exceeds revenue.",
    detailId: "Defisit Anggaran adalah postur APBN ekspansif di mana total belanja negara lebih besar dari penerimaan negaranya, seringkali ditutup dengan penerbitan surat utang (obligasi).",
    detailEn: "A budget deficit occurs when expenses exceed revenue and indicate the financial health of a country."
  },
  {
    term: "Budget Surplus", category: "Kebijakan Fiskal",
    shortId: "Kondisi penerimaan pemerintah melebihi pengeluarannya.", shortEn: "When government revenue exceeds spending.",
    detailId: "Surplus Anggaran adalah posisi keuangan fiskal negara di mana pendapatan dari pajak maupun PNBP melampaui jumlah pengeluaran operasional pemerintah.",
    detailEn: "A budget surplus occurs when income exceeds expenditures. The term usually refers to a government's financial state."
  },
  {
    term: "Inflation", category: "Ekonomi",
    shortId: "Kenaikan harga barang dan jasa secara umum.", shortEn: "General increase in prices of goods and services.",
    detailId: "Inflasi adalah indikator makroekonomi yang menunjukkan penurunan daya beli mata uang karena meningkatnya level harga sekumpulan produk dan layanan konsumsi di suatu negara.",
    detailEn: "Inflation is the rate of increase in prices over a given period of time, leading to a fall in the purchasing value of money."
  },
  {
    term: "Deflation", category: "Ekonomi",
    shortId: "Penurunan harga barang dan jasa secara umum.", shortEn: "General decrease in prices of goods and services.",
    detailId: "Deflasi adalah kebalikan dari inflasi, yaitu tingkat inflasi negatif di mana harga-harga mayoritas barang turun seiring memburuknya permintaan, seringkali merusak aktivitas bisnis.",
    detailEn: "Deflation is a general decline in prices for goods and services, typically associated with a contraction in the supply of money."
  },
  {
    term: "Quantitative Easing (QE)", category: "Kebijakan Moneter",
    shortId: "Kebijakan ekstrem cetak uang untuk membeli aset jarak panjang.", shortEn: "Unconventional policy of buying long-term securities.",
    detailId: "Pelonggaran Kuantitatif (QE) adalah kebijakan moneter non-konvensional di mana bank sentral membeli obligasi pemerintah jangka panjang secara masif untuk menyuntikkan likuiditas langsung ke sistem keuangan.",
    detailEn: "Quantitative easing is a form of unconventional monetary policy in which a central bank purchases longer-term securities from the open market."
  },
  {
    term: "Expansionary Fiscal Policy", category: "Kebijakan Fiskal",
    shortId: "Pemerintah menaikkan belanja & memotong pajak.", shortEn: "Government increases spending or decreases taxes.",
    detailId: "Kebijakan Fiskal Ekspansif dirancang untuk merangsang pertumbuhan ekonomi saat terjadi resesi. Dilakukan dengan memperbesar belanja infrastruktur dan memangkas tarif pajak rakyat.",
    detailEn: "Expansionary fiscal policy involves decreasing taxes, increasing government expenditures or both, in order to fight recessionary pressures."
  },
  {
    term: "Contractionary Fiscal Policy", category: "Kebijakan Fiskal",
    shortId: "Pemerintah memangkas belanja & menaikkan pajak.", shortEn: "Government cuts spending or raises taxes.",
    detailId: "Kebijakan Fiskal Kontraktif bertujuan untuk memperlambat laju ekonomi dan meredam tingkat inflasi yang sangat tinggi dengan menaikkan pajak atau mengurangi subsidi dan belanja negara.",
    detailEn: "Contractionary fiscal policy is a form of fiscal policy that involves increasing taxes, decreasing government expenditures or both, to fight inflationary pressures."
  },
  {
    term: "Progressive Tax", category: "Kebijakan Fiskal",
    shortId: "Sistem pajak di mana tarif meningkat seiring besarnya basis.", shortEn: "Tax rate increases as the taxable amount increases.",
    detailId: "Pajak Progresif adalah sistem perpajakan di mana tingkat pungutan pajak akan semakin besar secara persentase seiring dengan semakin besarnya jumlah penghasilan wajib pajak.",
    detailEn: "A progressive tax is a tax in which the tax rate increases as the taxable base amount increases."
  },
  {
    term: "Regressive Tax", category: "Kebijakan Fiskal",
    shortId: "Sistem pajak yang lebih memberatkan golongan pendapatan rendah.", shortEn: "Tax that takes a larger percentage from low-income earners.",
    detailId: "Pajak Regresif merupakan pajak dengan tarif tetap rata. Namun efeknya akan memukul lebih keras pada mereka yang berpendapatan rendah secara proporsional dibanding yang berpendapatan tinggi.",
    detailEn: "A regressive tax is a tax applied uniformly, taking a larger percentage of income from low-income earners than from high-income earners."
  },
  {
    term: "Crowding Out Effect", category: "Kebijakan Fiskal",
    shortId: "Pinjaman masif pemerintah menyedot dana, bunga swasta naik.", shortEn: "High govt borrowing causes high interest rates for private sector.",
    detailId: "Efek Pendesakan (Crowding Out) terjadi ketika pinjaman besar-besaran oleh pemerintah (untuk menutupi defisit) menyerap ketersediaan modal di pasar uang, sehingga suku bunga naik dan investasi swasta anjlok.",
    detailEn: "Crowding out effect is an economic theory arguing that rising public sector spending drives down or even eliminates private sector spending."
  },
  {
    term: "Seigniorage", category: "Kebijakan Moneter",
    shortId: "Keuntungan bank sentral dari pencetakan uang kertas.", shortEn: "Profit made by a government by issuing currency.",
    detailId: "Seigniorage adalah selisih nilai nominal (face value) dari mata uang yang baru dicetak dengan biaya aktual untuk memproduksi uang kertas dan koin logam tersebut.",
    detailEn: "Seigniorage is the difference between the face value of money, such as a $10 bill or a quarter coin, and the cost to produce it."
  },
  {
    term: "Tariff", category: "Kebijakan Fiskal",
    shortId: "Pajak yang dikenakan atas barang impor dari negara lain.", shortEn: "A tax imposed on imported goods and services.",
    detailId: "Tarif merupakan alat perlindungan (proteksi) perdagangan dalam bentuk pajak bea cukai atas barang dan jasa dari negara asing, bertujuan melindungi industri dalam negeri agar bisa bersaing.",
    detailEn: "A tariff is a tax imposed by a government of a country or of a supranational union on imports or exports of goods."
  },

  // --- 5. ASURANSI, HUKUM ASURANSI & REASURANSI ---
  {
    term: "Premium (Premi)", category: "Asuransi",
    shortId: "Sejumlah uang yang dibayarkan peserta kepada asuransi.", shortEn: "Amount paid for an insurance policy.",
    detailId: "Premi adalah biaya reguler bulanan atau tahunan yang disepakati untuk disetorkan tertanggung ke rekening perusahaan asuransi sebagai syarat jaminan pengalihan risiko.",
    detailEn: "An insurance premium is the amount of money an individual or business pays for an insurance policy."
  },
  {
    term: "Utmost Good Faith", category: "Hukum Asuransi",
    shortId: "Prinsip itikad baik sempurna dalam perjanjian asuransi.", shortEn: "Principle of complete honesty in an insurance contract.",
    detailId: "Utmost Good Faith (Uberrimae Fidei) mewajibkan nasabah untuk membuka fakta historis material sekecil apapun, dan pihak asuransi menjelaskan syarat polis secara gamblang.",
    detailEn: "Utmost good faith requires both the insurer and the insured to act honestly and not mislead or withhold critical information."
  },
  {
    term: "Indemnity", category: "Hukum Asuransi",
    shortId: "Prinsip ganti rugi sebesar kerugian riil yang dialami.", shortEn: "Compensation for exact damages or loss.",
    detailId: "Indemnity (Prinsip Ganti Rugi) menjamin bahwa santunan finansial yang diberikan tidak lebih dari kerugian finansial yang sebenarnya (tidak boleh mengambil untung dari musibah).",
    detailEn: "Indemnity is a comprehensive form of insurance compensation for damages or loss, restoring you to the prior financial state."
  },
  {
    term: "Insurable Interest", category: "Hukum Asuransi",
    shortId: "Hak/kepentingan keuangan yang sah atas objek yang diasuransikan.", shortEn: "Legitimate financial interest in the preservation of the insured subject.",
    detailId: "Prinsip Kepentingan Berasuransi mensyaratkan seseorang hanya dapat mengasuransikan nyawa atau aset jika ia akan menderita kerugian finansial yang sah atas rusak atau hilangnya objek tersebut.",
    detailEn: "Insurable interest is a type of investment that protects anything subject to a financial loss."
  },
  {
    term: "Subrogation", category: "Hukum Asuransi",
    shortId: "Hak menuntut pihak ketiga berpindah ke perusahaan asuransi.", shortEn: "Insurer's right to pursue a third party that caused the loss.",
    detailId: "Subrogasi mengatur peralihan hak untuk menuntut ganti rugi ke penanggung (asuransi) jika asuransi sudah membayar lunas klaim tertanggung atas kerugian yang disebabkan orang lain.",
    detailEn: "Subrogation is a term describing a legal right held by most insurance carriers to legally pursue a third party that caused an insurance loss."
  },
  {
    term: "Proximate Cause", category: "Hukum Asuransi",
    shortId: "Penyebab utama terdekat yang mendominasi sebuah kerugian.", shortEn: "The primary cause that triggers an insurance claim.",
    detailId: "Kausa Proksimal merupakan prinsip dasar asuransi untuk mencari akar dominan suatu kecelakaan/kerugian tanpa terputus. Jika penyebab utamanya masuk di polis, maka klaim dibayar.",
    detailEn: "Proximate cause is an event sufficiently related to an injury that the courts deem the event to be the cause of that injury."
  },
  {
    term: "Reinsurance (Reasuransi)", category: "Reasuransi",
    shortId: "Asuransi bagi perusahaan asuransi untuk membagi risiko.", shortEn: "Insurance that an insurance company purchases from another.",
    detailId: "Reasuransi terjadi ketika sebuah perusahaan asuransi (Ceding Company) mengalihkan bagian risiko fatalnya ke perusahaan reasuransi (Reinsurer) untuk menjaga kecukupan modal.",
    detailEn: "Reinsurance occurs when multiple insurance companies share risk by purchasing insurance policies from other insurers."
  },
  {
    term: "Policyholder", category: "Asuransi",
    shortId: "Pemilik resmi atau pemegang kontrak polis asuransi.", shortEn: "The person or entity who owns the insurance policy.",
    detailId: "Pemegang Polis adalah subjek hukum yang membuat dan menyepakati kontrak asuransi (Polis) dan bertanggung jawab atas pembayaran premi polis tersebut.",
    detailEn: "A policyholder is a person or entity who has purchased an insurance policy from an insurance provider."
  },
  {
    term: "Deductible (Risiko Sendiri)", category: "Asuransi",
    shortId: "Jumlah beban biaya yang harus dibayar sendiri sebelum klaim.", shortEn: "Amount you pay out of pocket before insurance pays.",
    detailId: "Deductible (Own Risk) adalah besaran angka kerugian kecil awal yang sengaja dikurangkan dari nilai ganti rugi asuransi, tujuannya mengurangi pengajuan klaim receh.",
    detailEn: "A deductible is the amount paid out of pocket by the policyholder before an insurance provider will pay any expenses."
  },
  {
    term: "Claim (Klaim)", category: "Asuransi",
    shortId: "Permintaan resmi penagihan kerugian ke pihak asuransi.", shortEn: "Formal request to an insurance company asking for payment.",
    detailId: "Klaim adalah pemberitahuan dan permohonan resmi klien kepada penanggung untuk mencairkan ganti rugi uang polis yang dijanjikan dalam kesepakatan.",
    detailEn: "An insurance claim is a formal request by a policyholder to an insurance company for coverage or compensation for a covered loss."
  },
  {
    term: "Underwriting", category: "Asuransi",
    shortId: "Proses seleksi dan penilaian kelayakan penerimaan risiko asuransi.", shortEn: "Process of evaluating and pricing risk.",
    detailId: "Underwriting adalah tahap investigasi medikal, moral, dan finansial oleh asuransi untuk menilai seberapa besar risiko calon nasabah dan menentukan keputusan lolos/tolaknya polis.",
    detailEn: "Underwriting is the process through which an individual or institution takes on financial risk for a fee."
  },
  {
    term: "Actuary (Aktuaris)", category: "Asuransi",
    shortId: "Ahli matematika penilai probabilitas dan tarif premi risiko.", shortEn: "Professional analyzing financial risk of insurance/pension.",
    detailId: "Aktuaris adalah pakar statistik dan matematika yang bertanggung jawab dalam perhitungan cadangan asuransi, mortalitas, investasi, dan formulasi harga premi.",
    detailEn: "An actuary is a business professional who deals with the measurement and management of risk and uncertainty."
  },
  {
    term: "Moral Hazard", category: "Hukum Asuransi",
    shortId: "Kelalaian klien karena merasa hartanya telah dilindungi asuransi.", shortEn: "Lack of incentive to guard against risk when protected.",
    detailId: "Bahaya Moral adalah pergeseran perilaku negatif di mana tertanggung mengambil keputusan yang lebih ceroboh dengan barangnya semata-mata karena telah dibackup oleh perlindungan finansial asuransi.",
    detailEn: "Moral hazard is a situation in which one party gets involved in a risky event knowing that it is protected against the risk."
  },
  {
    term: "Adverse Selection", category: "Hukum Asuransi",
    shortId: "Tendensi orang berisiko buruk mendominasi pembelian asuransi.", shortEn: "Tendency for high-risk individuals to buy insurance.",
    detailId: "Seleksi Memburuk (Adverse Selection) muncul akibat asimetri informasi, yaitu di mana calon klien berpenyakit fatal lebih antusias membeli asuransi daripada manusia sehat tanpa perusahaan mengetahuinya.",
    detailEn: "Adverse selection refers generally to a situation in which sellers have information that buyers do not have, or vice versa."
  },
  {
    term: "Treaty Reinsurance", category: "Reasuransi",
    shortId: "Kontrak asuransi borongan atas seluruh portofolio risiko.", shortEn: "Broad agreement covering an entire class of policies.",
    detailId: "Reasuransi Traktat merupakan perjanjian obligatori yang mengatur asuransi penanggung mengalihkan kategori besar asuransi tertentu tanpa perlu negosiasi pada tiap satu polis.",
    detailEn: "Treaty reinsurance is a broad agreement covering an entire class or portfolio of policies automatically."
  },
  {
    term: "Facultative Reinsurance", category: "Reasuransi",
    shortId: "Kontrak pertanggungan risiko besar secara kasus per kasus.", shortEn: "Reinsurance negotiated on an individual risk basis.",
    detailId: "Reasuransi Fakultatif adalah penerimaan pelimpahan risiko sangat besar yang dievaluasi satu per satu polis (kasus per kasus) dengan persetujuan bebas dari reasuradur.",
    detailEn: "Facultative reinsurance is coverage purchased by a primary insurer to cover a single risk—or a block of risks—held in the primary insurer's book of business."
  },

  // --- 6. AKUNTANSI ---
  {
    term: "Assets (Aset)", category: "Akuntansi",
    shortId: "Kekayaan ekonomi yang dimiliki perusahaan.", shortEn: "Resources owned by a business.",
    detailId: "Aset adalah sumber daya ekonomi (kas, alat, gedung, hak cipta) yang dikendalikan entitas untuk memberikan manfaat komersial masa depan.",
    detailEn: "An asset is a resource with economic value that an individual, corporation, or country owns or controls."
  },
  {
    term: "Liabilities (Liabilitas/Utang)", category: "Akuntansi",
    shortId: "Kewajiban finansial perusahaan kepada pihak luar.", shortEn: "Financial debts or obligations of a company.",
    detailId: "Liabilitas adalah kewajiban hukum atau utang perusahaan kepada vendor bank atau negara, yang penyelesaiannya mengakibatkan pengurangan arus aset.",
    detailEn: "A liability is something a person or company owes, usually a sum of money."
  },
  {
    term: "Equity (Ekuitas/Modal)", category: "Akuntansi",
    shortId: "Hak pemilik atas sisa aset setelah dikurangi liabilitas.", shortEn: "Owner's claim after subtracting liabilities from assets.",
    detailId: "Ekuitas/Modal Pemilik adalah residu bersih keuangan setelah seluruh hutang dibayarkan. Nilai inilah yang murni milik pemegang saham (Net Assets).",
    detailEn: "Equity represents the value that would be returned to a company's shareholders if all of the assets were liquidated."
  },
  {
    term: "Accounting Equation", category: "Akuntansi",
    shortId: "Persamaan Aset = Liabilitas + Ekuitas.", shortEn: "Formula: Assets = Liabilities + Equity.",
    detailId: "Persamaan Dasar Akuntansi membentuk kerangka fundamental laporan keuangan. Bahwa apapun wujud aktiva (kiri), itu bersumber dari pinjaman dan modal bersih (kanan).",
    detailEn: "The accounting equation states that a company's total assets are equal to the sum of its liabilities and its shareholders' equity."
  },
  {
    term: "Double-Entry Bookkeeping", category: "Akuntansi",
    shortId: "Metode pembukuan berpasangan di sisi Debit dan Kredit.", shortEn: "System where every entry has a corresponding debit and credit.",
    detailId: "Tata Buku Berpasangan mengharuskan setiap satu bukti transaksi moneter dicatat di minimal dua sisi akun keuangan (Debit dan Kredit) dengan total nilai balance yang persis sama.",
    detailEn: "Double-entry bookkeeping is a system of accounting in which every transaction has a corresponding positive and negative entry (debits and credits)."
  },
  {
    term: "Balance Sheet (Neraca)", category: "Akuntansi",
    shortId: "Laporan yang menunjukkan posisi aset, utang, dan modal.", shortEn: "Financial statement detailing assets, liabilities, and equity.",
    detailId: "Laporan Posisi Keuangan menyajikan porsi Aset di sebelah satu, serta liabilitas ditambah ekuitas di sebelahnya, pada hari titik waktu spesifik.",
    detailEn: "A balance sheet is a financial statement that reports a company's assets, liabilities, and shareholder equity at a specific point in time."
  },
  {
    term: "Income Statement (Laba Rugi)", category: "Akuntansi",
    shortId: "Laporan kinerja pendapatan dikurangi biaya.", shortEn: "Financial statement showing revenues, expenses, and profit/loss.",
    detailId: "Laporan Laba Rugi berfokus menjabarkan penerimaan uang dan seluruh pengeluaran operasional perusahaan selama satu periode yang menghasilkan cetak laba atau minus (rugi).",
    detailEn: "An income statement is a financial statement that shows you the company's income and expenditures. It also shows whether a company is making profit or loss for a given period."
  },
  {
    term: "Cash Flow Statement (Arus Kas)", category: "Akuntansi",
    shortId: "Laporan keluar masuknya kas secara operasional, investasi, pendanaan.", shortEn: "Financial statement tracking flow of cash.",
    detailId: "Laporan Arus Kas adalah rekaman perputaran uang tunai riil perusahaan yang dibagi pada aktivitas utama Operasi (inti), Investasi (aset diam), dan Pendanaan (kredit/saham).",
    detailEn: "A cash flow statement is a financial statement that provides aggregate data regarding all cash inflows a company receives."
  },
  {
    term: "Retained Earnings (Laba Ditahan)", category: "Akuntansi",
    shortId: "Laba bersih yang sengaja ditahan tidak dibagikan sebagai dividen.", shortEn: "Net income retained in the business instead of paid as dividends.",
    detailId: "Laba Ditahan merujuk ke sisa kumulatif profit berjalan perusahaan setelah para pemegang saham dibayar. Dana ini akan diputarkan ke pembaharuan teknologi atau bayar utang bank.",
    detailEn: "Retained earnings is the amount of net income left over for the business after it has paid out dividends to its shareholders."
  },
  {
    term: "Accounts Receivable (Piutang Usaha)", category: "Akuntansi",
    shortId: "Uang klien yang masih belum dibayarkan ke perusahaan.", shortEn: "Money owed to a company by its debtors.",
    detailId: "Piutang merujuk pada hak perusahaan (masuk aset kas kedepannya) untuk memotong tagihan barang yang telah lama diserahkan pada klien sebelum bayaran lunas didapatkan.",
    detailEn: "Accounts receivable refers to the money a company's customers owe for goods or services they have received but not yet paid for."
  },
  {
    term: "Accounts Payable (Utang Usaha)", category: "Akuntansi",
    shortId: "Tagihan perusahaan kepada pihak pemasok eksternal.", shortEn: "Money owed by a company to its creditors.",
    detailId: "Hutang Usaha (Liabilitas Lancar) muncul karena perusahaan mengambil suplai raw material atau tagihan operasional pihak luar (supplier) secara angsuran/jatuh tempo lambat.",
    detailEn: "Accounts payable represents a company's obligation to pay off a short-term debt to its creditors or suppliers."
  },
  {
    term: "Depreciation (Penyusutan)", category: "Akuntansi",
    shortId: "Pengalokasian penurunan harga/fungsi aset tetap secara berkala.", shortEn: "Allocating the cost of a tangible asset over its useful life.",
    detailId: "Penyusutan (Depresiasi) adalah metode memotong biaya harga historis kendaraan atau mesin untuk memecahnya ke masa manfaat aset berwujud seiring berkurangnya kinerja fisiknya.",
    detailEn: "Depreciation is an accounting method of allocating the cost of a tangible or physical asset over its useful life or life expectancy."
  },
  {
    term: "Amortization (Amortisasi)", category: "Akuntansi",
    shortId: "Penghapusan pelan-pelan atas aset tak berwujud (Hak cipta).", shortEn: "Spreading intangible asset costs over specific periods.",
    detailId: "Amortisasi ibarat depresiasi namun berlaku khusus bagi aset immaterial. Misalnya hak merek, lisensi software, royalty yang nilainya dicairkan bulanan/tahunan.",
    detailEn: "Amortization is an accounting technique used to periodically lower the book value of a loan or an intangible asset over a set period of time."
  },
  {
    term: "Accrual Basis (Basis Akrual)", category: "Akuntansi",
    shortId: "Mencatat transaksi saat terjadi walau uang belum ditransfer.", shortEn: "Recording revenues/expenses when incurred, not when cash moves.",
    detailId: "Sistem Akuntansi Basis Akrual meresmikan pendapatan/beban segera setelah kesepakatan penjualan produk diteken/dieksekusi terlepas koper tunainya telah bergeser tempat atau belum.",
    detailEn: "Accrual accounting is a method that records revenues and expenses when they are incurred, regardless of when cash is exchanged."
  },
  {
    term: "Cost of Goods Sold (COGS / HPP)", category: "Akuntansi",
    shortId: "Biaya pokok memproduksi barang yang telah laku dijual.", shortEn: "Direct costs of producing the goods sold by a company.",
    detailId: "Harga Pokok Penjualan menampung akumulasi bahan primer dan gaji karyawan manufaktur. Ini dikurangi oleh Revenue di struktur income untuk menjadi Laba Kotor.",
    detailEn: "Cost of goods sold (COGS) refers to the direct costs of producing the goods sold by a company. It excludes indirect expenses."
  },
  {
    term: "Trial Balance (Neraca Saldo)", category: "Akuntansi",
    shortId: "Daftar tes akumulasi saldo debit & kredit di buku besar.", shortEn: "A worksheet listing the balance of all ledgers.",
    detailId: "Neraca Saldo merupakan skema uji aritmatika dari ribuan jurnal agar dipastikan semua kolom sebelah kiri (Debit) benar-benar sama angkanya dengan kolom kanan (Kredit).",
    detailEn: "A trial balance is a bookkeeping worksheet in which the balances of all ledgers are compiled into debit and credit account column totals that are equal."
  },
  {
    term: "General Ledger (Buku Besar)", category: "Akuntansi",
    shortId: "Buku ringkasan catatan akhir yang mencatat tiap pergeseran akun.", shortEn: "The master set of accounts that summarize all transactions.",
    detailId: "Buku Besar mentabulasi secara kronologis catatan dari Buku Jurnal dengan mengelompokkannya per masing-masing nama wadah akun akuntansi tersendiri (Seperti tabel T Kas atau Utang).",
    detailEn: "A general ledger represents the record-keeping system for a company's financial data with debit and credit account records validated by a trial balance."
  },

  // --- 7. PERBANKAN, KREDIT & INSTITUSI KEUANGAN ---
  {
    term: "Central Bank (Bank Sentral)", category: "Perbankan",
    shortId: "Otoritas tertinggi moneter penjaga stabilitas mata uang negara.", shortEn: "Institution managing a state's currency and money supply.",
    detailId: "Bank Sentral (seperti Bank Indonesia atau US Federal Reserve) tidak melayani publik. Fungsinya merumuskan regulasi bank dan kebijakan stabilisasi moneter suatu negara.",
    detailEn: "A central bank is a public institution that manages a state's currency, money supply, and interest rates."
  },
  {
    term: "Commercial Bank (Bank Umum)", category: "Perbankan",
    shortId: "Lembaga keuangan pengelola simpan pinjam profit oriented.", shortEn: "Financial institution accepting deposits and offering loans.",
    detailId: "Bank Umum (Komersial) memberikan layanan langsung pada ritel dan bisnis berupa penerimaan dana Giro/Deposito serta pemberian investasi ke dalam Kredit UMKM atau Sindikasi demi margin Bunga.",
    detailEn: "A commercial bank is a type of financial institution that accepts deposits, offers checking account services, makes various loans, and offers basic financial products."
  },
  {
    term: "Investment Bank", category: "Perbankan",
    shortId: "Bank konsultan dan perantara raksasa transaksi korporasi (IPO, M&A).", shortEn: "Bank aiding companies in large complex financial transactions.",
    detailId: "Bank Investasi bekerja memandu korporasi mencari modal publik penerbitan pasar bursa, penasihat di Merger atau Akuisisi besar tanpa menerima deposito orang awam.",
    detailEn: "An investment bank is a financial services company or corporate division that engages in advisory-based financial transactions on behalf of individuals, corporations, and governments."
  },
  {
    term: "Credit Score (Skor Kredit)", category: "Kredit",
    shortId: "Angka penilaian profil risiko pinjaman calon peminjam.", shortEn: "Numerical expression of a person's creditworthiness.",
    detailId: "Skor Kredit adalah hitungan numerik berbasis riwayat cicilan kredit atau hutang terdahulu. Skor SLIK (BI Checking) buruk berarti suku bunga lebih tinggi/kredit ditolak.",
    detailEn: "A credit score is a numerical expression based on a level analysis of a person's credit files, to represent the creditworthiness of an individual."
  },
  {
    term: "Credit Rating Agency (Lembaga Pemeringkat)", category: "Institusi Keuangan",
    shortId: "Badan evaluasi kelayakan kredit negara atau obligasi perusahaan.", shortEn: "Company assigning credit ratings for debtors.",
    detailId: "Agen independen penilai peringkat utang (seperti Moody's/Pefindo) yang memberi skor huruf (AAA, BB-, Junk) pada surat hutang obligasi yang menentukan risiko kebangkrutannya.",
    detailEn: "A credit rating agency is a company that assigns credit ratings, which rate a debtor's ability to pay back debt by making timely principal and interest payments."
  },
  {
    term: "Mortgage (KPR/Hipotek)", category: "Kredit",
    shortId: "Kredit pemilikan jangka panjang terjamin agunan properti.", shortEn: "Loan used to purchase or maintain a home or property.",
    detailId: "Kredit Kepemilikan Rumah/Hipotek digunakan pemohon untuk membeli real-estate komersial atau hunian dengan rumah yang dibeli tersebut otomatis menjadi agunan (jaminan) ke bank.",
    detailEn: "A mortgage is a loan used either by purchasers of real property to raise funds to buy real estate, or alternatively by existing property owners to raise funds for any purpose."
  },
  {
    term: "Non-Performing Loan (NPL / Kredit Macet)", category: "Kredit",
    shortId: "Tunggakan utang peminjam yang nyaris gagal direstrukturisasi.", shortEn: "Bank loan subject to late repayment or default.",
    detailId: "NPL atau Kredit Bermasalah melampaui level toleransi pelunasan dari jatuh tempo 90 hari, menyumbat arus uang yang menyebabkan kebangkrutan perbankan internal.",
    detailEn: "A nonperforming loan (NPL) is a bank loan that is subject to late repayment or is unlikely to be repaid by the borrower in full."
  },
  {
    term: "Loan-to-Value Ratio (LTV)", category: "Kredit",
    shortId: "Rasio besaran kredit maksimal bank berbanding nilai jual agunannya.", shortEn: "Assessment of lending risk examining the loan vs collateral value.",
    detailId: "LTV menetapkan uang muka (DP). LTV 80% berarti nasabah hanya akan meminjam 800 Juta jika rumah harganya 1 Miliar dan ia berwajib membayar DP awal tunai sebesar 200 Juta.",
    detailEn: "The loan-to-value (LTV) ratio is an assessment of lending risk that financial institutions and other lenders examine before approving a mortgage."
  },
  {
    term: "Base Lending Rate (Suku Bunga Dasar Kredit)", category: "Kredit",
    shortId: "Pedoman patokan bunga minimal sebelum bank menghitung risiko debitur.", shortEn: "Minimum interest rate set by commercial banks.",
    detailId: "SBDK dihitung berdasarkan Biaya Dana murni Bank Komersial, merupakan acuan margin kotor awal bagi Bank umum sebelum menancapkan suku bunga aktual akhir nasabah KPR.",
    detailEn: "Base lending rate is the minimum interest rate that banks calculate and charge for borrowing. The actual rate varies per client's risk profile."
  },
  {
    term: "Fintech (Financial Technology)", category: "Institusi Keuangan",
    shortId: "Startup modern yang mengotomatiskan fitur layanan finansial (E-wallet).", shortEn: "Technology aimed at automating financial services.",
    detailId: "Fintech mendisrupsi dunia keuangan fisik dengan menyuntikkan algoritma mutakhir yang mengintegrasikan pinjaman digital (Pinjol), pembayaran via QR/Aplikasi Dompet digital.",
    detailEn: "Financial technology (Fintech) is used to describe new tech that seeks to improve and automate the delivery and use of financial services."
  },
  {
    term: "Peer-to-Peer (P2P) Lending", category: "Kredit",
    shortId: "Pinjam meminjam uang daring individu antar individu di internet.", shortEn: "Practice of lending money to individuals directly via online.",
    detailId: "Pinjaman P2P menghapus peran broker atau tabungan Bank sehingga kreditur perorangan secara terpusat menyalurkan kucuran dana di sebuah aplikasi web pada debitur secara langsung.",
    detailEn: "Peer-to-peer (P2P) lending enables individuals to obtain loans directly from other individuals, cutting out the financial institution as the middleman."
  },
  {
    term: "Otoritas Jasa Keuangan (OJK)", category: "Institusi Keuangan",
    shortId: "Lembaga negara pengawas ekosistem layanan investasi perbankan dan non bank.", shortEn: "Indonesian Financial Services Authority.",
    detailId: "OJK hadir mengawal kestabilan asuransi, pembiayaan, pasar saham, dana pensiun dari fraud ilegal di teritori wilayah hukum Indonesia secara independen.",
    detailEn: "The Financial Services Authority (OJK) is an Indonesian government agency that regulates and supervises the financial services sector."
  },
  {
    term: "Lembaga Penjamin Simpanan (LPS)", category: "Institusi Keuangan",
    shortId: "Badan yang menjaga kepanikan dan menalangi nasabah bank bangkrut.", shortEn: "Indonesian Deposit Insurance Corporation.",
    detailId: "Apabila ada bank dicabut izinnya akibat defisit gagal likuid, LPS memberikan perlindungan perlindungan deposit dengan menjamin penggantian tabungan nasabah sampai limit Rp2 Miliar.",
    detailEn: "The Indonesia Deposit Insurance Corporation (LPS) is an independent institution formed to guarantee bank deposits."
  },
  {
    term: "Know Your Customer (KYC)", category: "Perlindungan Konsumen",
    shortId: "Proses identifikasi resmi validasi rekam profil klien dari tindak ilegal.", shortEn: "Mandatory process of identifying and verifying the client's identity.",
    detailId: "Prinsip Mengenal Nasabah wajib diikuti pialang crypto dan Bank di mana pendaftar dimintai ID Card wajah dan info pekerjaan menghindari dana terorisme masuk jalur sistem.",
    detailEn: "Know Your Customer (KYC) is a standard in the investment industry that ensures advisors know detailed information about their clients' risk tolerance, investment knowledge, and financial position."
  },
  {
    term: "Anti-Money Laundering (AML)", category: "Perlindungan Konsumen",
    shortId: "Hukum kepatuhan penelusuran uang hasil gelap/korupsi.", shortEn: "Laws regulations halting income from illegal enterprises.",
    detailId: "Anti Pencucian Uang adalah kumpulan kebijakan tegas memberangus pelaku kejahatan persembunyian perpindahan uang selundupan menjadi wujud legal bersih perbankan sah.",
    detailEn: "Anti-money laundering (AML) refers to laws, regulations, and procedures intended to prevent criminals from disguising illegally obtained funds as legitimate income."
  },
  {
    term: "Phishing", category: "Perlindungan Konsumen",
    shortId: "Modus peretasan akun sosial dengan memanipulasi link palsu bank.", shortEn: "Cybercrime deception stealing user banking credentials.",
    detailId: "Phishing terjadi jika target tanpa sengaja ditelepon (OTP) atau mengisi formulir login di situs tiruan. Hal ini mengekspose keamanan informasi kata sandi kredit krusial mereka ke penipu.",
    detailEn: "Phishing is a type of social engineering where an attacker sends a fraudulent message designed to trick a person into revealing sensitive information or to deploy malicious software on the victim's infrastructure."
  },
  {
    term: "Whistleblower", category: "Institusi Keuangan",
    shortId: "Pelapor rahasia terbongkarnya penggelapan dalam korporat.", shortEn: "Person exposing illicit information or activity in an organization.",
    detailId: "Whistleblower (Peniup Peluit) mendeskripsikan seorang pegawai jujur/berani yang mengadukan praktik pelaporan fiktif kecurangan audit penyelewengan di sebuah entitas finansial.",
    detailEn: "A whistleblower is anyone who has and reports insider knowledge of illegal activities occurring in an organization."
  },
  {
    term: "Fraud", category: "Institusi Keuangan",
    shortId: "Kecurangan menipu dokumen yang bertujuan meraup dana melanggar hukum.", shortEn: "Intentional deception to secure unfair or unlawful gain.",
    detailId: "Kecurangan Finansial adalah manipulasi laporan laba rugi asuransi, klaim fiktif rumah sakit, hingga kasus ponzi skema piramida penipuan.",
    detailEn: "Fraud is an intentionally deceptive action designed to provide the perpetrator with an unlawful gain or to deny a right to a victim."
  },

  // --- 8. FINANCIAL LITERACY & PERSONAL FINANCE ---
  {
    term: "Financial Literacy", category: "Financial Literacy",
    shortId: "Kecakapan literasi pengelolaan, investasi & kehati-hatian mengurus uang.", shortEn: "The ability to understand and effectively use financial skills.",
    detailId: "Melek Finansial (Financial Literacy) adalah basis kesadaran psikologis & keterampilan praktis individu mengendalikan alokasi penghasilan agar bebas utang konsumtif di masa depan.",
    detailEn: "Financial literacy is the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing."
  },
  {
    term: "Budgeting", category: "Financial Literacy",
    shortId: "Rancangan target porsi pemasukan lawan pengeluaran rumah tangga bulanan.", shortEn: "Creating a plan to spend your money.",
    detailId: "Penganggaran (Budgeting) (misal aturan populer 50/30/20) mencegah pemborosan kas tak kasat mata melalui kategorisasi dana wajib kebutuhan vs keinginan/rekreasi.",
    detailEn: "A budget is a spending plan based on income and expenses. It is an estimate of how much money you'll make and spend over a certain period of time."
  },
  {
    term: "Emergency Fund", category: "Financial Literacy",
    shortId: "Tabungan cair khusus untuk kejutan insiden krisis darurat medis/PHK.", shortEn: "Cash reserve specifically set aside for unplanned expenses.",
    detailId: "Dana Darurat biasanya dihimbau sebesar 3 hingga 6 bulan ukuran minimal gaji rutin bulanan. Disimpan secara instan ditarik tanpa mencairkan aset saham lambat.",
    detailEn: "An emergency fund is a stash of money set aside to cover the financial surprises life throws your way, reducing the need for high-interest debt."
  },
  {
    term: "Net Worth (Kekayaan Bersih)", category: "Financial Literacy",
    shortId: "Total kalkulasi semua harta aset kurangi total himpitan utang Anda.", shortEn: "The value of all assets minus the total of all liabilities.",
    detailId: "Kekayaan Bersih diukur dari tabungan, investasi obligasi, harga pasar nilai mobil/rumah, namun setelah dipangkas dari tunggakan hipotek, kartu kredit & cicilan motor.",
    detailEn: "Net worth is the value of all the non-financial and financial assets owned by an individual minus the value of all their outstanding liabilities."
  },
  {
    term: "Passive Income", category: "Financial Literacy",
    shortId: "Duit uang yang datang tanpa memakan energi/waktu utama kerjamu.", shortEn: "Earnings derived from an enterprise in which a person is not materially involved.",
    detailId: "Penghasilan Pasif berasal dari sewa kos, royalti lagu/buku, dividen saham bisnis di mana arusnya konsisten masuk biarpun kita sedang tidur atau liburan panjang.",
    detailEn: "Passive income is earnings derived from a rental property, limited partnership, or other enterprise in which a person is not actively involved."
  },
  {
    term: "Active Income", category: "Financial Literacy",
    shortId: "Uang keringat, yaitu gajian yang mengharuskan hadirnya jam operasional fisik.", shortEn: "Income earned from performing a service.",
    detailId: "Pendapatan Aktif didapatkan orang saat menukar skill, upah per jam kerja lembur shift fisik kantor atau freelance komisi.",
    detailEn: "Active income refers to income received from performing a service, which includes wages, tips, salaries, commissions, and income from businesses in which there is material participation."
  },
  {
    term: "Compound Interest", category: "Financial Literacy",
    shortId: "Bunga dari simpanan utama plus akumulasi bunganya yang tak pernah diambil.", shortEn: "Interest calculated on the initial principal and accumulated interest.",
    detailId: "Bunga Majemuk adalah pedang dua mata. Sangat dahsyat kekuatannya di investasi saham (Bunga Berbunga), tetapi mencekik jika ia berlaku di dalam jebakan angsuran kartu kredit.",
    detailEn: "Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on principal plus interest."
  },
  {
    term: "Rule of 72", category: "Financial Literacy",
    shortId: "Matematika rumus cepat mengestimasi kapan uang investasi naik lipat dua.", shortEn: "Formula to estimate the number of years required to double the invested money.",
    detailId: "Aturan 72 dihitung dengan membagi angka 72 dengan tingkat suku bunga tahunan, maka keluar hasil indikator berapa masa tahun investasi akan melipatgandakan jumlah.",
    detailEn: "The Rule of 72 is a quick, useful formula that is popularly used to estimate the number of years required to double the invested money at a given annual rate of return."
  },
  {
    term: "Inflation Risk", category: "Financial Literacy",
    shortId: "Dampak terkikisnya harga uang cash tabungan yang tergerus pelan-pelan.", shortEn: "Risk that inflation will undermine the performance of an investment.",
    detailId: "Risiko Inflasi adalah bahaya klasik menaruh uang di bawah kasur. Saat tingkat suku bunga deposito jauh di bawah laju inflasi negara riil, tabunganmu diam namun hartamu minus.",
    detailEn: "Inflation risk is the risk that inflation will undermine the performance of an investment, the value of an asset, or the purchasing power of a stream of income."
  },
  {
    term: "Time Value of Money (TVM)", category: "Financial Literacy",
    shortId: "Prinsip: Sepuluh ribu hari ini lebih perkasa daya belinya dibanding 5 tahun nanti.", shortEn: "Concept that money today is worth more than the identical sum in the future.",
    detailId: "Nilai Waktu Uang meyakini fakta karena potensial kapasitas penambahan bunga. Uang tunai di saku hari ini mendatangkan modal bunga komersil kalau ditaruh ke bank hari ini juga.",
    detailEn: "The time value of money (TVM) is the concept that a sum of money is worth more now than the same sum will be at a future date due to its earnings potential in the interim."
  },
  {
    term: "Amortization Schedule", category: "Financial Literacy",
    shortId: "Tabel rinci pembayaran perbulan berapa ke pokok utang, berapa ke beban margin bank.", shortEn: "Complete table of periodic loan payments.",
    detailId: "Jadwal Amortisasi merinci kalkulasi hipotek. Pada tahun pertama porsi bunga dibayar jauh lebih tinggi sementara sedikit mengurangi utang pokok, grafiknya menyilang nanti di akhir pelunasan.",
    detailEn: "An amortization schedule is a complete table of periodic loan payments, showing the amount of principal and the amount of interest that comprise each payment."
  },
  {
    term: "Financial Independence", category: "Financial Literacy",
    shortId: "Fase kebebasan seutuhnya untuk opsi pensiun tanpa ditopang kerja wajib.", shortEn: "Having enough wealth to live without working.",
    detailId: "Kemandirian Finansial terwujud manakala akumulasi total aset pendapatan Pasif di reksadana/propertimu lebih banyak dari angka kebutuhan minimum pengeluaran rumah bulanan standar.",
    detailEn: "Financial independence means having enough wealth to live on without working. Financially independent people have assets that generate income that is greater than their expenses."
  },

  // --- 9. LABOR MARKET (PASAR TENAGA KERJA) ---
  {
    term: "Labor Force (Angkatan Kerja)", category: "Labor Market",
    shortId: "Populasi usia siap produktif kerja & yang sedang menanti panggilan.", shortEn: "Sum of employed and unemployed persons.",
    detailId: "Angkatan kerja mencakup seluruh demografi rakyat kelompok umur 15-64 tahun yang saat ini telah mengemban pekerjaan (buruh aktif) beserta kaum penganggur pencari lowongan.",
    detailEn: "The labor force consists of all the people who are currently employed plus the unemployed who are looking for work."
  },
  {
    term: "Frictional Unemployment", category: "Labor Market",
    shortId: "Penganggur jangka pendek karena waktu tenggang mencari pekerjaan pas di hati.", shortEn: "Temporary unemployment while transitioning between jobs.",
    detailId: "Pengangguran Friksional terjadi secara alamiah. Biasanya dari lulusan wisuda terbaru universitas, atau saat pekerja cuti mengundurkan diri dan mendaftar wawancara tes loker baru (jeda singkat).",
    detailEn: "Frictional unemployment is a type of voluntary unemployment that arises when workers are searching for new jobs or transitioning from one job to another."
  },
  {
    term: "Structural Unemployment", category: "Labor Market",
    shortId: "Pengangguran lama sebab tergantikannya skill tangan oleh Robotika/Mesin.", shortEn: "Unemployment from mismatch of skills or tech shifts.",
    detailId: "Pengangguran Struktural (Krusial) meledak ketika industri lokal berpindah arah, kemampuan dan ijazah sarjana usang tak cocok lagi, di mana perusahaan IT mencari spesialis AI.",
    detailEn: "Structural unemployment is a long-lasting event that is caused by fundamental shifts in an economy and exacerbated by extraneous factors such as technology."
  },
  {
    term: "Cyclical Unemployment", category: "Labor Market",
    shortId: "Korban PHK yang terjadi mendadak imbas turunnya omzet perusahaan (Krisis).", shortEn: "Unemployment resulting from economic downturns.",
    detailId: "Pengangguran Siklis melanda seiring turunnya putaran siklus Makro. Permintaan konsumen melemah ekstrem (Deflasi Resesi) menyebabkan bos pabrik terpaksa merumahkan karyawan (COVID-19).",
    detailEn: "Cyclical unemployment is the component of overall unemployment that results directly from cycles of economic upturn and downturn."
  },
  {
    term: "Minimum Wage (Upah Minimum)", category: "Labor Market",
    shortId: "Gaji bayaran nominal paling rendah standar UMR perlindungan pemerintah.", shortEn: "Lowest remuneration that employers can legally pay.",
    detailId: "Upah Minimum (Price Floor) adalah dasar limit gaji bulanan per daerah kota yang tidak diizinkan diubah secara hukum oleh bos/pengusaha dengan dalih jaminan kehidupan buruh harian layak.",
    detailEn: "A minimum wage is the lowest remuneration that employers can legally pay their workers—the price floor below which workers may not sell their labor."
  },
  {
    term: "Labor Union (Serikat Pekerja)", category: "Labor Market",
    shortId: "Asosiasi paguyuban persatuan demo perunding pekerja atas bos perusahaan.", shortEn: "Organization of workers who unite to protect their rights.",
    detailId: "Serikat Pekerja menegosiasikan asuransi lembur perlindungan (Collective Bargaining) tawar menawar di depan manajemen raksasa demi membela jam kerja aman kesehatan sesama kelas pekerja.",
    detailEn: "A labor union is an organization of workers dedicated to improving wages, hours, and working conditions for its members through collective bargaining."
  },
  {
    term: "Human Capital", category: "Labor Market",
    shortId: "Kumpulan modal intelektual gelar sekolah & keahlian fisik tersembunyi buruh.", shortEn: "Economic value of a worker's experience and skills.",
    detailId: "Modal Manusia mencerminkan value pelatihan aset otak SDM kesehatan pengalaman mental. Aset ini bisa ditingkatkan pemerintah jika membangun balai Latihan Vokasi ke masyarakat gratis.",
    detailEn: "Human capital is an intangible asset or quality not listed on a company's balance sheet. It includes elements like education, training, intelligence, skills, health."
  },
  {
    term: "Brain Drain", category: "Labor Market",
    shortId: "Migrasi keluarnya orang-orang pintar/pakar dari negera krisis ke luar benua.", shortEn: "Emigration of highly trained or intelligent people.",
    detailId: "Brain Drain terjadi apabila Ilmuwan Peneliti Insiyur dari negara berkembang eksodus bermigrasi besar-besaran untuk berbakti ke perusahaan AS Eropa karena iming-iming riset finansial hebat.",
    detailEn: "Brain drain refers to the emigration or migration of individuals who have received advanced training at home to other regions or countries."
  },
  {
    term: "Demographic Dividend", category: "Labor Market",
    shortId: "Ledakan bonus populasi jumlah angkatan buruh muda menguasai persentase grafik lansia.", shortEn: "Economic growth potential from shifts in a population's age structure.",
    detailId: "Bonus Demografi merupakan jendela di mana persentase struktur rakyat umur produktif melonjak sangat besar, di mana potensi lonjakan GDP akan drastis menaikkan pamor ekonomi nasional.",
    detailEn: "The demographic dividend is the economic growth potential that can result from shifts in a population's age structure, mainly when the share of the working-age population is larger."
  },
  {
    term: "Labor Force Participation Rate", category: "Labor Market",
    shortId: "Statistik persentase warga negara yang sedang sungguh-sungguh ambil bagian banting tulang.", shortEn: "Measure of an economy's active workforce.",
    detailId: "Tingkat Partisipasi Angkatan Kerja menyingkirkan golongan pelajar aktif dan ibu rumah tangga pensiunan dari ukuran total. Menghitung mutlak berapa banyak tenaga kerja mengalir di pasar modal harian.",
    detailEn: "The labor force participation rate indicates the percentage of all people of working age who are employed or are actively seeking work."
  },

  // --- 10. BEHAVIORAL ECONOMICS (EKONOMI PERILAKU) ---
  {
    term: "Behavioral Economics", category: "Perilaku Ekonomi",
    shortId: "Studi biologi & kebiasaan psikologis manusia di arena rasionalitas investasi finansial.", shortEn: "Study of psychology in economic decision making.",
    detailId: "Ekonomi Perilaku mendobrak teori 'Homo Economicus' dengan menyelidiki bias otak, sentimen panik FOMO yang menstimulasi keputusan irasional boros menyimpang jauh dari matematis standar.",
    detailEn: "Behavioral economics studies the effects of psychological, cognitive, emotional, cultural and social factors on the decisions of individuals and institutions."
  },
  {
    term: "Loss Aversion", category: "Perilaku Ekonomi",
    shortId: "Sindrom rasa ketakutan ekstrem untuk menderita kerugian ketimbang kebahagiaan.", shortEn: "Tendency to prefer avoiding losses over acquiring equivalent gains.",
    detailId: "Loss Aversion menjebak kita dalam depresi psikologis. Merelakan rugi turun Rp1 Juta di saham lebih terasa melukai emosi berkali-kali lipat dibanding euforia mendapat untung Rp1 Juta ekstra uang dadakan.",
    detailEn: "Loss aversion is a cognitive bias that explains why individuals feel the pain of a loss more acutely than the joy of an equivalent gain."
  },
  {
    term: "Sunk Cost Fallacy", category: "Perilaku Ekonomi",
    shortId: "Jebakan emosional terus menahan aset rugi berat dikarenakan enggan menelan ludah rugi.", shortEn: "Continuing an endeavor due to previously invested resources.",
    detailId: "Kesesatan Biaya Hangus adalah keras kepala psikologis di mana trader menolak menjual saham babak belurnya karena 'Sudah Terlanjur' menghabiskan waktu, uang, komisi, pada aset zonk gagal di masa lalu.",
    detailEn: "The sunk cost fallacy is our tendency to follow through on an endeavor if we have already invested time, effort, or money into it, whether or not the current costs outweigh the benefits."
  },
  {
    term: "Confirmation Bias", category: "Perilaku Ekonomi",
    shortId: "Tutup telinga terhadap info kritikan dan hanya mencari artikel pendukung.", shortEn: "Tendency to search for info that confirms one's preconceptions.",
    detailId: "Bias Konfirmasi menuntun trader masuk ke ruang gema kesesatan logis, mengabaikan warning ahli beritanya jelek melainkan hanya mempercayai YouTuber optimis yang membenarkan hipotesisnya.",
    detailEn: "Confirmation bias is the tendency to search for, interpret, favor, and recall information in a way that confirms or supports one's prior beliefs or values."
  },
  {
    term: "Herd Behavior", category: "Perilaku Ekonomi",
    shortId: "Perilaku menggerombol menjiplak tebakan opini rombongan grup investasi Telegram.", shortEn: "Individuals acting together in a group without planned direction.",
    detailId: "Mentalitas Menggembala adalah perilaku psikologis irasional kepanikan memencet Buy gara-gara 'ikut-ikutan' arus bandar kawan investor mayoritas secara membabi buta tanpa riset teknikal dan kalkulasi.",
    detailEn: "Herd behavior is the phenomenon in which individuals act collectively as part of a group, often making decisions based on what others are doing rather than on their own independent analysis."
  },
  {
    term: "Anchoring Bias", category: "Perilaku Ekonomi",
    shortId: "Bias yang terpatok berat pada patokan harga memori referensi perdana pertama.", shortEn: "Relying heavily on the first piece of information offered.",
    detailId: "Efek Jangkar menjangkar rasionalitas. Contoh saat beli baju Rp900.000 diskon dari Rp3 Juta, ia buru-buru tergiur murah karena pikiran asalnya ditarik oleh ilusi angka awal Rp3 Juta yang mungkin tidak nyata.",
    detailEn: "Anchoring bias is a cognitive bias that causes us to rely too heavily on the first piece of information we are given about a topic."
  },
  {
    term: "Mental Accounting", category: "Perilaku Ekonomi",
    shortId: "Membagi pos dompet anggaran ke sekat-sekat kategori nilai mental tidak setara.", shortEn: "Concept of categorizing and treating money differently.",
    detailId: "Akuntansi Mental adalah pengotakan tak rasionalitas. Memandang Rp1 Juta hasil hadiah lotre lebih gampang dihamburkan foya-foya (karena uang gampang), padahal secara nilai murni sama dengan uang gaji berkeringat sebulan.",
    detailEn: "Mental accounting refers to the different values a person places on the same amount of money, based on subjective criteria, often with detrimental results."
  },
  {
    term: "Framing Effect", category: "Perilaku Ekonomi",
    shortId: "Otak menanggapi presentasi pemasaran data yang dipelintir lewat kata-kata diksi kemasan beda.", shortEn: "Drawing different conclusions from the same information depending on presentation.",
    detailId: "Efek Pembingkaian memanipulasi persepsi lewat teks. Manusia lebih berani membeli reksadana dengan presentasi Brosur 'Tingkat Sukses Pengembalian Tinggi di Atas 80%' daripada Brosur tertulis 'Peluang Gagal dan Merugi Investasi Adalah 20%'.",
    detailEn: "The framing effect is a cognitive bias where people decide on options based on whether the options are presented with positive or negative connotations."
  },
  {
    term: "Endowment Effect", category: "Perilaku Ekonomi",
    shortId: "Menghargai barang sendiri tidak masuk akal lebih tinggi dibanding jika bukan milik tangan kita.", shortEn: "Overvaluing an object merely because one owns it.",
    detailId: "Efek Kepemilikan. Trader mengklaim portofolio perusahaannya sangat magis (enggan dijual karena lekat sentimentil ikatan batin). Hal ini menuntut bayaran irasional di mata pihak obyektif pembeli netral pasar bebas.",
    detailEn: "The endowment effect describes a circumstance in which an individual places a higher value on an object that they already own than the value they would place on that same object if they did not own it."
  },
  {
    term: "Overconfidence Bias", category: "Perilaku Ekonomi",
    shortId: "Keyakinan narsisme berlebih atas akurasi analisa peramal dirinya atas ilusi kendali pasar.", shortEn: "Overestimating one's abilities, knowledge, or skill.",
    detailId: "Bias Terlalu Pede mengaburkan fakta objektif bahwa keberuntungan yang menentukan nasib kebetulan tren investasi untungnya, namun ia malah merasuki dirinya dengan euforia merasa diri sejenius pakar manajer keuangan ulung jenius.",
    detailEn: "Overconfidence bias is a tendency to hold a false and misleading assessment of our skills, intellect, or talent. In short, it's an egotistical belief that we're better than we actually are."
  },
  {
    term: "Status Quo Bias", category: "Perilaku Ekonomi",
    shortId: "Sifat kemalasan anti pergeseran untuk bertahan di asuransi keuangan lama meskipun jelas merugi.", shortEn: "Preference for the current state of affairs.",
    detailId: "Bias Mempertahankan Status Quo memelihara kepasifan individu untuk enggan pindah aplikasi perbankan baru / kartu kredit lain akibat repot malas pusing setting. Mereka mempertahankan kenyamanan merugikan dari kebiasaan lapuk default asali masa lampau.",
    detailEn: "Status quo bias is an emotional bias; a preference for the current state of affairs. The current baseline is taken as a reference point, and any change from that baseline is perceived as a loss."
  },
  {
    term: "Availability Heuristic", category: "Perilaku Ekonomi",
    shortId: "Membuat penilaian ketakutan investasi dengan mengandalkan kengerian artikel viral sensasional terkini terbaru di TV.", shortEn: "Mental shortcut relying on immediate examples.",
    detailId: "Heuristik Ketersediaan mencontohkan efek panik parno saat media rajin menyorot krisis kebangkrutan pesawat di berita, seketika orang-orang menolak berinvestasi di saham Maskapai akibat memori menakutkan padahal statistiknya tetap sangat solid stabil aman di balik layar sesungguhnya.",
    detailEn: "The availability heuristic is a mental shortcut that relies on immediate examples that come to a given person's mind when evaluating a specific topic, concept, method or decision."
  },
  {
    term: "Nudge Theory", category: "Perilaku Ekonomi",
    shortId: "Dorongan tak sadar intervensi psikologis instansi merubah susunan kebiasaan perilaku arsitektur orang dari bawah tangan kelabu.", shortEn: "Concept proposing positive reinforcement to influence behavior.",
    detailId: "Teori Senggolan/Dorongan Halus adalah trik sistemik seperti menu BPJS / Pensiun asuransi negara yang di-default (Auto Enroll) aktif seketika dari gaji. Kebanyakan warga terdorong menabung investasi pasif kebaikannya dan sedikit yang sengaja repot lapor menonaktifkannya.",
    detailEn: "Nudge theory is a concept in behavioral economics which proposes positive reinforcement and indirect suggestions as ways to influence the behavior and decision-making of groups or individuals."
  },
  {
    term: "Choice Architecture", category: "Perilaku Ekonomi",
    shortId: "Strategi desain menu opsional tata letak untuk mengontrol dan mengelabui mata manuver pembelian orang menuju sasaran paket profit maksimal.", shortEn: "Design of different ways in which choices can be presented to consumers.",
    detailId: "Arsitektur Pilihan (Choice Architecture). Contoh riil adalah penyusunan menu perbankan investasi dari kiri (Paket Hemat) lalu di tengah dibesarkan visualnya (Paket Recommended Emas) agar kita lebih tergiring tanpa sadar psikologis menunjuk visual klik tengah termewah itu dibanding menu sisi pinggir kanan.",
    detailEn: "Choice architecture is the design of different ways in which choices can be presented to consumers, and the impact of that presentation on consumer decision-making."
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
    }, 4000);
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

      {/* MODAL / POPUP DETAIL */}
      {selectedTerm.term && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          
          <div 
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
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

            {/* Modal Content */}
            <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar flex-grow">
              
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
          
          <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
        </div>
      )}

      {/* Global Styles */}
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