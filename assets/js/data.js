/* =========================================================================
   ABODHI — Content & Commerce Data
   Bilingual (VI / EN), 28 products across 8 categories, journal, testimonials
   ========================================================================= */
window.ABODHI_DATA = (() => {
  "use strict";

  const CATEGORIES = [
    {
      id: "incense",
      order: 1,
      name: { vi: "Nhang trầm", en: "Agarwood Incense" },
      short: { vi: "Nhang", en: "Incense" },
      tagline: { vi: "Nghệ thuật thưởng trầm", en: "The art of incense" },
      desc: {
        vi: "Nụ, cây, vân mây, không tăm và bột trầm — chế tác thủ công từ bột trầm nguyên chất, kết dính bằng vỏ cây bời lời.",
        en: "Cones, sticks, coils, coreless incense and powder — handcrafted from pure agarwood with natural litsea bark binder."
      },
      icon: "i-fire",
      image: "assets/images/incense-field.jpg",
      subs: [
        { id: "nu", name: { vi: "Nụ trầm", en: "Incense cones" } },
        { id: "cay", name: { vi: "Nhang cây", en: "Incense sticks" } },
        { id: "van-may", name: { vi: "Vân mây lớn / mini", en: "Cloud & coil" } },
        { id: "khong-tam", name: { vi: "Không tăm", en: "Coreless" } },
        { id: "bot", name: { vi: "Bột trầm", en: "Agarwood powder" } }
      ]
    },
    {
      id: "tea",
      order: 2,
      name: { vi: "Trà trầm", en: "Agarwood Tea" },
      short: { vi: "Trà", en: "Tea" },
      tagline: { vi: "Vị thanh giữa tĩnh tại", en: "Stillness in every sip" },
      desc: {
        vi: "Trà sấy thăng hoa từ thân lá trà và trầm hương, dịu nhẹ cho những buổi sớm an nhiên.",
        en: "Freeze-dried tea blended with agarwood leaf and resin for calm, gentle mornings."
      },
      icon: "i-cup",
      image: "assets/images/tea-amber.jpg",
      subs: [
        { id: "thang-hoa", name: { vi: "Trà sấy thăng hoa", en: "Freeze-dried tea" } },
        { id: "mat-ong", name: { vi: "Trà mật ong", en: "Honey tea" } }
      ]
    },
    {
      id: "essential",
      order: 3,
      name: { vi: "Tinh dầu trầm", en: "Essential Oils" },
      short: { vi: "Tinh dầu", en: "Oil" },
      tagline: { vi: "Chưng cất từ tâm gỗ", en: "Distilled from the heartwood" },
      desc: {
        vi: "Tinh dầu trầm hương, BOM và sả chanh chưng cất chậm, giữ trọn tầng hương sâu và ấm.",
        en: "Slow-distilled agarwood, BOM and lemongrass oils that preserve deep, warming scent layers."
      },
      icon: "i-drop",
      image: "assets/images/oil-amber.jpg",
      subs: [
        { id: "tram-huong", name: { vi: "Trầm hương", en: "Agarwood" } },
        { id: "bom", name: { vi: "BOM", en: "BOM" } },
        { id: "sa", name: { vi: "Sả chanh", en: "Lemongrass" } }
      ]
    },
    {
      id: "distilled",
      order: 4,
      name: { vi: "Nước cất", en: "Distilled Waters" },
      short: { vi: "Nước cất", en: "Water" },
      tagline: { vi: "Thanh lọc không gian", en: "Purify your space" },
      desc: {
        vi: "Nước trầm hương, hạ khô thảo, quế lượng tử và nước thanh tẩy năng lượng — tinh khiết, dịu lành.",
        en: "Agarwood, self-heal, quantum cinnamon and energy-cleansing waters — pure and gentle."
      },
      icon: "i-spa",
      image: "assets/images/water-cinnamon.jpg",
      subs: [
        { id: "tram-huong", name: { vi: "Trầm hương", en: "Agarwood" } },
        { id: "ha-kho-thao", name: { vi: "Hạ khô thảo", en: "Self-heal" } },
        { id: "que-luong-tu", name: { vi: "Quế lượng tử", en: "Quantum cinnamon" } },
        { id: "thanh-tay", name: { vi: "Thanh tẩy năng lượng", en: "Energy cleansing" } }
      ]
    },
    {
      id: "jewelry",
      order: 5,
      name: { vi: "Trang sức trầm", en: "Agarwood Jewelry" },
      short: { vi: "Trang sức", en: "Jewelry" },
      tagline: { vi: "Hương thơm theo thân nhiệt", en: "Worn close, warmed by you" },
      desc: {
        vi: "Vòng tay 6–14 li, chuỗi 21–108 hạt và phôi trầm tuyển chọn — vẻ đẹp của thời gian trên từng thớ gỗ.",
        en: "6–14mm bracelets, 21–108 bead malas and select raw beads — beauty shaped by time."
      },
      icon: "i-bead",
      image: "assets/images/beads-bracelet.jpg",
      subs: [
        { id: "vong-6-8", name: { vi: "Vòng tay 6li – 8li", en: "Bracelet 6–8mm" } },
        { id: "vong-10-12", name: { vi: "Vòng tay 10li – 12li", en: "Bracelet 10–12mm" } },
        { id: "chuoi-108", name: { vi: "Chuỗi 21 – 108 hạt", en: "Mala 21–108 beads" } },
        { id: "phoi-hat", name: { vi: "Phôi hạt trầm", en: "Raw agarwood beads" } }
      ]
    },
    {
      id: "soap",
      order: 6,
      name: { vi: "Xà bông thảo mộc", en: "Botanical Soap" },
      short: { vi: "Xà bông", en: "Soap" },
      tagline: { vi: "Chăm sóc từ rừng xanh", en: "Forest-born care" },
      desc: {
        vi: "Xà bông trầm hương gỗ thơm, sả hoa hồng và hoa chữa lành — lành dịu cho làn da mỗi ngày.",
        en: "Agarwood, rose-lemongrass and healing-flower soaps — a gentle daily ritual for your skin."
      },
      icon: "i-soap",
      image: "assets/images/soap-rose.jpg",
      subs: [
        { id: "go-thom", name: { vi: "Gỗ thơm", en: "Woody" } },
        { id: "sa-hoa-hong", name: { vi: "Sả hoa hồng", en: "Rose lemongrass" } },
        { id: "hoa-chua-lanh", name: { vi: "Hoa chữa lành", en: "Healing flower" } }
      ]
    },
    {
      id: "art",
      order: 7,
      name: { vi: "Mỹ nghệ trầm", en: "Agarwood Art" },
      short: { vi: "Mỹ nghệ", en: "Art" },
      tagline: { vi: "Tác phẩm của đất trời", en: "Made by nature, finished by hand" },
      desc: {
        vi: "Tượng, phôi cảnh và tác phẩm đặt riêng — mỗi khối trầm là một câu chuyện không lặp lại.",
        en: "Statues, sculptural pieces and bespoke commissions — every block of agarwood tells a singular story."
      },
      icon: "i-bowl",
      image: "assets/images/carving-log.jpg",
      subs: [
        { id: "tuong", name: { vi: "Tượng trầm", en: "Agarwood statues" } },
        { id: "phoi-canh", name: { vi: "Phôi cảnh sưu tầm", en: "Collector pieces" } },
        { id: "dat-rieng", name: { vi: "Đặt theo yêu cầu", en: "Bespoke" } }
      ]
    },
    {
      id: "accessories",
      order: 8,
      name: { vi: "Phụ kiện thưởng trầm", en: "Incense Accessories" },
      short: { vi: "Phụ kiện", en: "Accessories" },
      tagline: { vi: "Nghi lễ trọn vẹn", en: "Complete the ritual" },
      desc: {
        vi: "Lư xông, khay đốt, tro núi và bộ trà — những vật dụng nhỏ hoàn thiện nghi lễ thưởng trầm.",
        en: "Burners, trays, mountain ash and tea sets — small objects that complete the ritual."
      },
      icon: "i-spark",
      image: "assets/images/burner-ceramic.jpg",
      subs: [
        { id: "lu-huong", name: { vi: "Lư hương", en: "Burners" } },
        { id: "khay-dot", name: { vi: "Khay đốt & tro", en: "Trays & ash" } },
        { id: "bo-tra", name: { vi: "Bộ trà", en: "Tea sets" } }
      ]
    }
  ];

  const P = (o) => o;

  const PRODUCTS = [
    P({
      id: "inc-01", sku: "AB-NT01", slug: "nu-tram-thuong-hang-abodhi", cat: "incense", sub: "nu",
      name: { vi: "Nụ Trầm Hương Thượng Hạng Abodhi", en: "Abodhi Premium Agarwood Incense Cones" },
      subtitle: { vi: "Hộp 45 nụ · Hương ngọt sâu lắng", en: "Box of 45 cones · Deep, sweet aroma" },
      price: 480000, compareAt: 550000, rating: 5.0, reviewCount: 128, badge: "bestseller",
      images: ["assets/images/incense-burning.jpg", "assets/images/burner-ceramic.jpg", "assets/images/smoke-blue.jpg"],
      short: {
        vi: "Hương ngọt sâu lắng, khói trắng mỏng nhẹ, thích hợp xông phòng trà và thác khói.",
        en: "Deep sweet aroma and delicate white smoke, ideal for tea rooms and backflow burners."
      },
      description: {
        vi: "Nụ Trầm Hương Thượng Hạng Abodhi được ép khuôn thủ công từ 100% bột trầm hương tích dầu trên 15 năm tại vùng núi Quảng Nam, kết dính bằng vỏ cây bời lời tự nhiên.",
        en: "Hand-moulded from 100% resin-rich agarwood powder aged over 15 years in the mountains of Quang Nam, bound with natural litsea bark."
      },
      story: {
        vi: [
          "Mỗi nụ trầm là một lần nghệ nhân Abodhi cân lại tỷ lệ bột trầm và keo bời lời bằng cảm giác và kinh nghiệm. Không hương liệu tổng hợp, không hóa chất cuốn tàn — chỉ có mùi gỗ ấm và làn khói trắng mảnh như sương.",
          "Khi đốt, nụ trầm cho hậu vị ngọt thanh, lưu hương bền bỉ đến bốn giờ. Đây là lựa chọn quen thuộc cho phòng trà, phòng thiền, spa và những buổi tối cần sự tĩnh tại."
        ],
        en: [
          "Each cone is a quiet act of balance: oil-rich agarwood powder and natural litsea binder, measured by hand and intuition. No synthetic fragrance, no ash-curling chemicals — only warm wood and a thread of white smoke.",
          "It burns with a clean, sweet finish and lingers for up to four hours. A familiar companion for tea rooms, meditation spaces, spas and quiet evenings."
        ]
      },
      usage: {
        vi: ["Đặt nụ trên khay chịu nhiệt hoặc lư hương, tránh vật liệu dễ cháy.", "Châm lửa phần đỉnh nụ, để cháy đều khoảng 30 giây rồi thổi tắt ngọn lửa.", "Để nụ tự cháy trong không gian thoáng; mỗi nụ dùng cho phòng 15–25m²."],
        en: ["Place a cone on a heatproof tray or incense burner, away from flammable materials.", "Light the tip, let it catch for about 30 seconds, then gently blow out the flame.", "Let it smoulder in a ventilated room; one cone suits a 15–25m² space."]
      },
      specs: {
        origin: { vi: "Quảng Nam, Việt Nam", en: "Quang Nam, Vietnam" },
        age: { vi: "15–18 năm tích trầm", en: "15–18 years resin formation" },
        scent: { vi: "Ngọt thanh, ấm áp, thoáng hương thảo mộc rừng", en: "Sweet, warm, with forest herbal notes" },
        weight: { vi: "Hộp 45 nụ · khoảng 60g", en: "45 cones · approx. 60g" }
      },
      options: [
        { id: "45", label: { vi: "Hộp 45 nụ", en: "Box of 45" }, price: 480000, compareAt: 550000, stock: 28 },
        { id: "90", label: { vi: "Hộp gỗ 90 nụ", en: "Wooden box of 90" }, price: 890000, compareAt: 1010000, stock: 12 }
      ]
    }),
    P({
      id: "inc-02", sku: "AB-NT02", slug: "nu-tram-kien-rung-thap-lon", cat: "incense", sub: "nu",
      name: { vi: "Nụ Trầm Kiến Rừng Đặc Biệt Tháp Lớn", en: "Wild Ant-Nest Agarwood Large Cones" },
      subtitle: { vi: "Hộp 36 nụ · Trầm kiến tự nhiên", en: "Box of 36 · Wild agarwood" },
      price: 750000, compareAt: null, rating: 4.9, reviewCount: 84, badge: "limited",
      images: ["assets/images/temple-burner.jpg", "assets/images/incense-burning.jpg", "assets/images/smoke-square.jpg"],
      short: {
        vi: "Hàm lượng tinh dầu cao, thời gian cháy 35 phút/nụ, thanh lọc không khí hiệu quả.",
        en: "High oil content, 35-minute burn time per cone, beautifully purifying."
      },
      description: {
        vi: "Tuyển chọn từ nguồn trầm kiến tự nhiên giàu tinh dầu, nụ tháp lớn giúp lan tỏa hương thơm nhanh chóng trong không gian rộng.",
        en: "Selected from oil-rich wild agarwood, these large cones diffuse fragrance quickly through generous spaces."
      },
      story: {
        vi: ["Trầm kiến là phần gỗ được cây dó bầu tích nhựa qua nhiều thập kỷ, thường được tìm thấy trong những cánh rừng già. Hương trầm kiến dày, ấm và có chiều sâu khác biệt.", "Nụ tháp lớn được nặn tay từng chiếc, phù hợp phòng khách, lễ tân spa, không gian thờ tự hoặc những buổi thiền tập dài."],
        en: ["Ant-nest agarwood is resin accumulated over decades in old-growth forests. Its scent is dense, warm and unmistakably deep.", "Each large cone is shaped by hand for living rooms, spa receptions, altars or longer meditation sessions."]
      },
      usage: {
        vi: ["Dùng khay chịu nhiệt có miệng rộng để đỡ tro.", "Đốt 30 giây rồi thổi tắt, giữ khoảng cách an toàn với rèm và vật liệu dễ cháy.", "Dùng 1 nụ cho phòng 25–35m², thông gió nhẹ."],
        en: ["Use a wide heatproof tray to catch the ash.", "Light for 30 seconds and blow out; keep away from curtains and flammables.", "Use one cone for a 25–35m² room with light ventilation."]
      },
      specs: {
        origin: { vi: "Khánh Hòa, Việt Nam", en: "Khanh Hoa, Vietnam" },
        age: { vi: "20 năm tích trầm", en: "20 years resin formation" },
        scent: { vi: "Ngọt đậm, sâu lắng, trầm ấm", en: "Rich sweetness, deep and grounding" },
        weight: { vi: "Hộp 36 nụ tháp lớn", en: "Box of 36 large cones" }
      },
      options: [
        { id: "36", label: { vi: "Hộp 36 nụ lớn", en: "Box of 36 large" }, price: 750000, stock: 18 },
        { id: "72", label: { vi: "Hộp 72 nụ lớn", en: "Box of 72 large" }, price: 1420000, stock: 7 }
      ]
    }),
    P({
      id: "inc-03", sku: "AB-NC01", slug: "nhang-tram-co-tam-thien-tam", cat: "incense", sub: "cay",
      name: { vi: "Nhang Trầm Có Tăm Sạch Thiện Tâm", en: "Thien Tam Clean Bamboo Agarwood Incense" },
      subtitle: { vi: "30cm · Ống 100 cây", en: "30cm · Tube of 100 sticks" },
      price: 260000, compareAt: 310000, rating: 5.0, reviewCount: 215, badge: "bestseller",
      images: ["assets/images/incense-field.jpg", "assets/images/incense-burning.jpg", "assets/images/incense-vintage.jpg"],
      short: {
        vi: "Tăm tre mộc không nhuộm phẩm màu, ít khói, không cay mắt, phù hợp thờ cúng hằng ngày.",
        en: "Unbleached bamboo core, low smoke and eye-friendly — made for daily rituals."
      },
      description: {
        vi: "Nhang trầm có tăm Abodhi giữ trọn màu nâu mộc mạc của gỗ trầm nguyên chất, tuyệt đối không hóa chất cuốn tàn hay hương liệu tổng hợp.",
        en: "Abodhi bamboo incense keeps the natural brown of pure agarwood, with zero ash-curling chemicals or synthetic fragrance."
      },
      story: {
        vi: ["Chúng tôi chọn tăm tre già, chẻ tay và phơi đủ nắng để que nhang cháy đều, không mùi khét. Bột trầm được trộn với nước và keo bời lời theo tỷ lệ riêng của Abodhi.", "Thành phẩm có khói mảnh, hương dịu và tàn tro xám nhẹ. Một lựa chọn bình dị cho bàn thờ gia tiên, phòng làm việc hay góc đọc sách."],
        en: ["We choose mature bamboo, split it by hand and sun-dry it so each stick burns evenly without a scorched note. Agarwood powder is blended with water and litsea binder to Abodhi's own ratio.", "The result is a fine smoke, a gentle scent and soft grey ash — an everyday companion for the family altar, a desk or a reading corner."]
      },
      usage: {
        vi: ["Cắm nhang vào lư hoặc chân đế chịu nhiệt.", "Châm lửa, để cháy 5–10 giây rồi thổi tắt.", "Không để nhang cháy gần vật liệu dễ bắt lửa; mở cửa nhẹ để không khí lưu thông."],
        en: ["Place the stick in a burner or heatproof holder.", "Light it, let it catch for 5–10 seconds, then blow out.", "Keep away from flammables and allow gentle air circulation."]
      },
      specs: {
        origin: { vi: "Quảng Nam, Việt Nam", en: "Quang Nam, Vietnam" },
        age: { vi: "12 năm tích trầm", en: "12 years resin formation" },
        scent: { vi: "Thanh dịu, trang nghiêm, thuần khiết", en: "Gentle, sacred and pure" },
        weight: { vi: "Ống 100 cây · dài 30cm", en: "Tube of 100 · 30cm" }
      },
      options: [
        { id: "100", label: { vi: "Ống 100 cây 30cm", en: "Tube of 100 · 30cm" }, price: 260000, compareAt: 310000, stock: 46 },
        { id: "200", label: { vi: "Ống 200 cây 38cm", en: "Tube of 200 · 38cm" }, price: 490000, compareAt: 580000, stock: 20 }
      ]
    }),
    P({
      id: "inc-04", sku: "AB-NV01", slug: "nhang-van-may-thien-dinh", cat: "incense", sub: "van-may",
      name: { vi: "Nhang Vân Mây Trầm Hương Thiền Định", en: "Meditation Cloud Agarwood Coil Incense" },
      subtitle: { vi: "Hộp 24 khoanh · Cháy 2 giờ", en: "24 coils · 2-hour burn" },
      price: 420000, compareAt: null, rating: 4.9, reviewCount: 67, badge: "new",
      images: ["assets/images/smoke-blue.jpg", "assets/images/temple-burner.jpg", "assets/images/burner-sculpture.jpg"],
      short: {
        vi: "Tạo hình vân mây nghệ thuật, cháy liên tục 2 giờ mỗi khoanh, lý tưởng cho trà đạo và yoga.",
        en: "Artistic cloud shape, 2-hour continuous burn per coil — made for tea ceremony and yoga."
      },
      description: {
        vi: "Những đường nét vân mây uyển chuyển được tạo hình tinh xảo từ bột trầm nguyên chất, mang lại trải nghiệm thị giác tĩnh tại song hành cùng hương trầm thanh thoát.",
        en: "Fluid cloud lines are shaped from pure agarwood powder, offering a visual meditation alongside a serene scent."
      },
      story: {
        vi: ["Khoanh vân mây được nghệ nhân tạo hình trên khuôn đồng, sau đó sấy khô chậm để giữ nguyên các đường cong mềm mại. Khi cháy, khói đi theo rãnh xoắn tạo thành dòng khói liên tục.", "Đây là dòng sản phẩm được yêu thích trong các buổi trà đạo, lớp yoga và không gian thiền. Mỗi khoanh cháy khoảng hai giờ, đủ cho một buổi thực hành trọn vẹn."],
        en: ["Each cloud coil is shaped on a copper mould and slowly dried to preserve its soft curves. As it burns, smoke follows the spiral in one continuous ribbon.", "A favourite for tea gatherings, yoga classes and meditation rooms. Each coil burns for about two hours — enough for a complete practice."]
      },
      usage: {
        vi: ["Treo khoanh trên giá đỡ hoặc đặt trên khay chịu nhiệt có lõi đỡ.", "Châm lửa ở đầu ngoài cùng, để cháy 30 giây rồi thổi tắt.", "Giữ phòng thoáng, tránh gió mạnh làm khói tắt."],
        en: ["Hang the coil on a holder or place it on a heatproof tray with a support core.", "Light the outer tip, let it catch for 30 seconds, then blow out.", "Keep the room ventilated but avoid strong draughts."]
      },
      specs: {
        origin: { vi: "Huế, Việt Nam", en: "Hue, Vietnam" },
        age: { vi: "15 năm tích trầm", en: "15 years resin formation" },
        scent: { vi: "Thanh thoát, ngọt nhẹ, thư giãn sâu", en: "Airy, lightly sweet, deeply relaxing" },
        weight: { vi: "Hộp 24 khoanh · 2 giờ/khoanh", en: "24 coils · 2 hours each" }
      },
      options: [
        { id: "12", label: { vi: "Hộp 12 khoanh", en: "Box of 12" }, price: 240000, stock: 22 },
        { id: "24", label: { vi: "Hộp 24 khoanh", en: "Box of 24" }, price: 420000, stock: 16 },
        { id: "48", label: { vi: "Hộp 48 khoanh", en: "Box of 48" }, price: 780000, stock: 6 }
      ]
    }),
    P({
      id: "inc-05", sku: "AB-NK01", slug: "nhang-khong-tam-thuong-tra", cat: "incense", sub: "khong-tam",
      name: { vi: "Nhang Trầm Không Tăm Thưởng Trà", en: "Coreless Agarwood Incense for Tea" },
      subtitle: { vi: "Ống 120 que · Không lõi tre", en: "120 sticks · No bamboo core" },
      price: 520000, compareAt: null, rating: 4.9, reviewCount: 93, badge: null,
      images: ["assets/images/incense-smoke.jpg", "assets/images/smoke-vertical.jpg", "assets/images/incense-burning.jpg"],
      short: {
        vi: "Không lõi tre nên không lẫn mùi khói gỗ cháy, giữ trọn 100% vị ngọt nguyên bản của trầm.",
        en: "No bamboo core means no burnt-wood note — just the pure, sweet voice of agarwood."
      },
      description: {
        vi: "Dòng sản phẩm dành riêng cho người sành trầm, sử dụng trong phòng máy lạnh, bàn làm việc hoặc thưởng trà buổi sớm.",
        en: "A connoisseur's incense for air-conditioned rooms, desks and early-morning tea."
      },
      story: {
        vi: ["Bằng cách loại bỏ hoàn toàn lõi tre, que nhang không tăm cho làn khói tinh khiết hơn, không có mùi gỗ cháy và tro rất ít. Đây là kỹ thuật khó, đòi hỏi bột trầm có độ kết dính tự nhiên cao.", "Hương thơm mềm, thanh và lan tỏa chậm. Phù hợp cho không gian kín, người nhạy mùi khói và những buổi trà cần sự tập trung."],
        en: ["By removing the bamboo core entirely, coreless incense offers a purer smoke, no burnt-wood note and very little ash. It is a difficult craft that demands naturally cohesive agarwood powder.", "The scent is soft, clean and slow to unfold — ideal for enclosed spaces, sensitive noses and focused tea sessions."]
      },
      usage: {
        vi: ["Dùng chân đế ghim nhẹ hoặc khay có rãnh giữ que.", "Châm lửa 5 giây, thổi tắt và đặt ở vị trí cân bằng.", "Phù hợp phòng 15–20m²; không cần mở cửa lớn."],
        en: ["Use a pin holder or a grooved tray to keep the stick upright.", "Light for 5 seconds, blow out and place on a stable surface.", "Suits rooms of 15–20m²; no need for wide-open windows."]
      },
      specs: {
        origin: { vi: "Khánh Hòa, Việt Nam", en: "Khanh Hoa, Vietnam" },
        age: { vi: "18 năm tích trầm", en: "18 years resin formation" },
        scent: { vi: "Tinh khiết, ngọt thanh mát, không khét", en: "Pure, cool sweetness, never scorched" },
        weight: { vi: "Ống 120 que · dài 21cm", en: "Tube of 120 · 21cm" }
      },
      options: [
        { id: "60", label: { vi: "Ống 60 que", en: "Tube of 60" }, price: 290000, stock: 30 },
        { id: "120", label: { vi: "Ống 120 que", en: "Tube of 120" }, price: 520000, stock: 18 }
      ]
    }),
    P({
      id: "inc-06", sku: "AB-NB01", slug: "bot-tram-nguyen-chat", cat: "incense", sub: "bot",
      name: { vi: "Bột Trầm Hương Nguyên Chất", en: "Pure Agarwood Powder" },
      subtitle: { vi: "Hũ 50g · Nghiền mịn", en: "50g jar · Finely milled" },
      price: 350000, compareAt: null, rating: 4.8, reviewCount: 41, badge: null,
      images: ["assets/images/agarwood-chips.jpg", "assets/images/agarwood-close.jpg", "assets/images/agarwood-log.jpg"],
      short: {
        vi: "Bột trầm nguyên chất nghiền mịn từ gỗ trầm tích dầu, dùng để pha trộn hoặc đốt trên than.",
        en: "Pure agarwood powder milled from resinous wood, for blending or burning over charcoal."
      },
      description: {
        vi: "Bột trầm hương nguyên chất được nghiền từ phôi trầm tuyển chọn, giữ nguyên hàm lượng nhựa tự nhiên và hương gỗ ấm.",
        en: "Pure powder milled from selected agarwood, retaining its natural resin and warm wood aroma."
      },
      story: {
        vi: ["Bột trầm là nguyên liệu nền cho nhiều nghi lễ thưởng trầm. Abodhi nghiền chậm để bột mịn, không sinh nhiệt quá cao làm mất hương.", "Có thể dùng trực tiếp trên than hoặc phối cùng bột thảo mộc để tạo hỗn hợp riêng. Bảo quản kín, tránh ẩm và ánh nắng trực tiếp."],
        en: ["Agarwood powder is the foundation of many incense rituals. Abodhi mills slowly to keep the powder fine without overheating the resin.", "Use it directly over charcoal or blend with herbal powders to create your own mixture. Store sealed, away from moisture and sunlight."]
      },
      usage: {
        vi: ["Rắc một lượng nhỏ lên than hồng đã phủ tro.", "Có thể trộn cùng bột quế, hồi hoặc thảo mộc theo sở thích.", "Đậy kín sau khi dùng, bảo quản nơi khô mát."],
        en: ["Sprinkle a small amount over glowing charcoal covered with ash.", "Blend with cinnamon, star anise or herbs to taste.", "Seal after use and store in a cool, dry place."]
      },
      specs: {
        origin: { vi: "Gia Lai, Việt Nam", en: "Gia Lai, Vietnam" },
        age: { vi: "20+ năm tích trầm", en: "20+ years resin formation" },
        scent: { vi: "Gỗ trầm ấm, nhựa thơm đậm", en: "Warm agarwood, deep resinous sweetness" },
        weight: { vi: "Hũ 50g", en: "50g jar" }
      },
      options: [
        { id: "20", label: { vi: "Hũ 20g", en: "20g jar" }, price: 180000, stock: 28 },
        { id: "50", label: { vi: "Hũ 50g", en: "50g jar" }, price: 350000, stock: 22 },
        { id: "100", label: { vi: "Hũ 100g", en: "100g jar" }, price: 650000, stock: 11 }
      ]
    }),
    P({
      id: "tea-01", sku: "AB-TT01", slug: "tra-tram-say-thang-hoa", cat: "tea", sub: "thang-hoa",
      name: { vi: "Trà Trầm Hương Sấy Thăng Hoa", en: "Freeze-Dried Agarwood Tea" },
      subtitle: { vi: "Hộp 50g · Thân lá trà", en: "50g box · Leaf and stem" },
      price: 360000, compareAt: 420000, rating: 4.9, reviewCount: 56, badge: "bestseller",
      images: ["assets/images/tea-amber.jpg", "assets/images/tea-cup.jpg", "assets/images/agarwood-chips.jpg"],
      short: {
        vi: "Vị trà thanh, hậu ngọt dịu, phảng phất hương trầm ấm — thức uống cho buổi sớm tĩnh tại.",
        en: "A clean tea with a soft sweet finish and a whisper of warm agarwood — a quiet morning ritual."
      },
      description: {
        vi: "Trà sấy thăng hoa từ thân lá trà kết hợp trầm hương tuyển chọn, giữ trọn hương vị tự nhiên và màu nước vàng hổ phách.",
        en: "Freeze-dried tea from leaf and stem, blended with selected agarwood to preserve its natural aroma and amber liquor."
      },
      story: {
        vi: ["Trà được hái vào sáng sớm, sấy thăng hoa để giữ nguyên cấu trúc lá và hương thơm. Trầm hương được thêm vào với tỷ lệ rất nhỏ, đủ để tạo hậu vị ấm mà không lấn át vị trà.", "Nước trà trong, màu hổ phách, hương dịu. Có thể uống nóng hoặc lạnh, dùng như một nghi thức chậm lại giữa ngày dài."],
        en: ["Leaves are picked at dawn and freeze-dried to preserve their structure and aroma. Agarwood is added in a very small ratio — enough to leave a warm finish without overpowering the tea.", "The liquor is clear amber with a gentle fragrance. Enjoy it hot or cold as a ritual of slowing down."]
      },
      usage: {
        vi: ["Dùng 3–5g trà cho 150ml nước ở 85–90°C.", "Hãm 2–3 phút, có thể pha lại 2–3 lần.", "Thêm mật ong nếu muốn vị ngọt nhẹ."],
        en: ["Use 3–5g of tea per 150ml of 85–90°C water.", "Steep for 2–3 minutes; re-steep 2–3 times.", "Add honey for a softer sweetness."]
      },
      specs: {
        origin: { vi: "Thái Nguyên & Quảng Nam", en: "Thai Nguyen & Quang Nam" },
        age: { vi: "Trà vụ mới · trầm 12 năm", en: "Fresh tea · 12-year agarwood" },
        scent: { vi: "Thanh, ngọt hậu, thoáng trầm", en: "Clean, sweet finish, subtle agarwood" },
        weight: { vi: "Hộp 50g", en: "50g box" }
      },
      options: [
        { id: "30", label: { vi: "Hộp 30g", en: "30g box" }, price: 240000, stock: 24 },
        { id: "50", label: { vi: "Hộp 50g", en: "50g box" }, price: 360000, compareAt: 420000, stock: 30 },
        { id: "100", label: { vi: "Hộp 100g", en: "100g box" }, price: 680000, stock: 12 }
      ]
    }),
    P({
      id: "tea-02", sku: "AB-TT02", slug: "tra-tram-mat-ong", cat: "tea", sub: "mat-ong",
      name: { vi: "Trà Trầm Mật Ong", en: "Agarwood Honey Tea" },
      subtitle: { vi: "Hộp 20 gói · Tiện lợi", en: "20 sachets · Everyday ease" },
      price: 285000, compareAt: null, rating: 4.8, reviewCount: 38, badge: null,
      images: ["assets/images/tea-cup.jpg", "assets/images/tea-amber.jpg", "assets/images/smoke-square.jpg"],
      short: {
        vi: "Trà thảo mộc kết hợp mật ong rừng và trầm hương, dịu cổ họng, thơm ấm.",
        en: "Herbal tea with wild honey and agarwood — soothing for the throat, warmly aromatic."
      },
      description: {
        vi: "Sự kết hợp giữa trà thảo mộc, mật ong rừng nguyên chất và trầm hương tạo nên thức uống ấm dịu, phù hợp mọi lứa tuổi.",
        en: "Herbal tea, raw wild honey and agarwood come together in a gentle, warming drink for all ages."
      },
      story: {
        vi: ["Những gói trà nhỏ được phối trộn để giữ trọn vị ngọt tự nhiên của mật ong và hương trầm nhẹ. Không đường tinh luyện, không hương liệu.", "Một tách trà ấm vào cuối ngày giúp cổ họng dễ chịu và tâm trí lắng lại. Dùng được cả khi trà nguội."],
        en: ["Each sachet is blended to preserve the natural sweetness of honey and the soft lift of agarwood. No refined sugar, no synthetic flavouring.", "A warm cup at day's end soothes the throat and settles the mind. Delicious warm or at room temperature."]
      },
      usage: {
        vi: ["Đặt 1 gói vào 150ml nước nóng 90°C.", "Hãm 3–4 phút rồi thưởng thức.", "Có thể thêm gừng hoặc quế nếu thích."],
        en: ["Place one sachet in 150ml of 90°C water.", "Steep for 3–4 minutes and enjoy.", "Add ginger or cinnamon if desired."]
      },
      specs: {
        origin: { vi: "Việt Nam", en: "Vietnam" },
        age: { vi: "Trầm 10 năm", en: "10-year agarwood" },
        scent: { vi: "Mật ong ấm, thảo mộc dịu", en: "Warm honey, soft herbs" },
        weight: { vi: "Hộp 20 gói · 2g/gói", en: "20 sachets · 2g each" }
      },
      options: [
        { id: "10", label: { vi: "Hộp 10 gói", en: "Box of 10" }, price: 160000, stock: 30 },
        { id: "20", label: { vi: "Hộp 20 gói", en: "Box of 20" }, price: 285000, stock: 26 },
        { id: "40", label: { vi: "Hộp 40 gói", en: "Box of 40" }, price: 540000, stock: 13 }
      ]
    }),
    P({
      id: "oil-01", sku: "AB-TD01", slug: "tinh-dau-tram-huong-nguyen-chat", cat: "essential", sub: "tram-huong",
      name: { vi: "Tinh Dầu Trầm Hương Nguyên Chất", en: "Pure Agarwood Essential Oil" },
      subtitle: { vi: "10ml · Chưng cất chậm", en: "10ml · Slow distilled" },
      price: 1250000, compareAt: 1450000, rating: 5.0, reviewCount: 72, badge: "bestseller",
      images: ["assets/images/oil-hands.jpg", "assets/images/oil-amber.jpg", "assets/images/oil-dropper.jpg"],
      short: {
        vi: "Chưng cất chậm từ trầm tích dầu, hương ấm sâu, dùng khuếch tán hoặc pha dầu nền.",
        en: "Slow-distilled from resinous agarwood, deep and warm for diffusers or carrier-oil blends."
      },
      description: {
        vi: "Tinh dầu trầm hương nguyên chất Abodhi được chưng cất từ phôi trầm già, không pha tạp, giữ trọn tầng hương gỗ ấm và ngọt sâu.",
        en: "Abodhi's pure agarwood oil is distilled from aged agarwood with no dilution, preserving its warm wood and deep sweetness."
      },
      story: {
        vi: ["Mỗi mẻ chưng cất kéo dài nhiều ngày để tách dần các tầng hương. Tinh dầu thành phẩm có màu hổ phách sậm, độ sánh tự nhiên và hương lưu rất lâu.", "Một vài giọt trong máy khuếch tán hoặc pha loãng với dầu nền jojoba có thể mang lại cảm giác tĩnh tại cho không gian và làn da."],
        en: ["Each batch is distilled over several days to separate the scent layers. The finished oil is deep amber, naturally viscous and long-lasting.", "A few drops in a diffuser or diluted in jojoba oil can bring calm to a room and to the skin."]
      },
      usage: {
        vi: ["Khuếch tán: 3–5 giọt cho 100ml nước.", "Pha loãng 1–2% với dầu nền trước khi dùng trên da.", "Không dùng trực tiếp cho trẻ nhỏ hoặc phụ nữ mang thai khi chưa tham khảo ý kiến."],
        en: ["Diffuse 3–5 drops per 100ml water.", "Dilute to 1–2% in a carrier oil before applying to skin.", "Avoid direct use on young children or during pregnancy without advice."]
      },
      specs: {
        origin: { vi: "Quảng Nam, Việt Nam", en: "Quang Nam, Vietnam" },
        age: { vi: "25 năm tích trầm", en: "25 years resin formation" },
        scent: { vi: "Ấm, ngọt sâu, gỗ trầm cổ thụ", en: "Warm, deep sweetness, old-growth wood" },
        weight: { vi: "Chai 10ml · thủy tinh tối", en: "10ml amber glass bottle" }
      },
      options: [
        { id: "5", label: { vi: "Chai 5ml", en: "5ml bottle" }, price: 690000, stock: 18 },
        { id: "10", label: { vi: "Chai 10ml", en: "10ml bottle" }, price: 1250000, compareAt: 1450000, stock: 14 },
        { id: "30", label: { vi: "Chai 30ml", en: "30ml bottle" }, price: 3350000, stock: 5 }
      ]
    }),
    P({
      id: "oil-02", sku: "AB-TD02", slug: "tinh-dau-bom", cat: "essential", sub: "bom",
      name: { vi: "Tinh Dầu BOM", en: "BOM Essential Oil" },
      subtitle: { vi: "10ml · Hương gỗ thơm dịu", en: "10ml · Soft woody aroma" },
      price: 680000, compareAt: null, rating: 4.8, reviewCount: 36, badge: null,
      images: ["assets/images/oil-rosemary.jpg", "assets/images/oil-dropper.jpg", "assets/images/agarwood-close.jpg"],
      short: {
        vi: "Hương gỗ nhẹ, thanh và dễ chịu, phù hợp khuếch tán trong phòng làm việc.",
        en: "A light, clean wood aroma that works beautifully in a workspace diffuser."
      },
      description: {
        vi: "Tinh dầu BOM được chưng cất từ gỗ thơm tự nhiên, mang tầng hương gỗ nhẹ, tươi và dễ chịu.",
        en: "BOM oil is distilled from natural aromatic wood, offering a light, fresh and easy wood note."
      },
      story: {
        vi: ["BOM là dòng tinh dầu có hương nhẹ hơn trầm, thường được dùng để tạo không gian sạch và tỉnh táo. Mùi hương không quá nặng, phù hợp người mới bắt đầu.", "Có thể phối cùng sả chanh hoặc bạc hà để tạo hỗn hợp khuếch tán riêng."],
        en: ["BOM is lighter than agarwood oil and often used to create a clean, alert atmosphere. Its scent is approachable for newcomers.", "Blend it with lemongrass or mint to create your own diffuser blend."]
      },
      usage: {
        vi: ["Khuếch tán 4–6 giọt cho 100ml nước.", "Có thể nhỏ vài giọt lên đá thơm hoặc miếng gỗ.", "Bảo quản nơi khô mát, tránh ánh nắng."],
        en: ["Diffuse 4–6 drops per 100ml water.", "Add a few drops to a scent stone or wooden diffuser.", "Store in a cool, dry place away from sunlight."]
      },
      specs: {
        origin: { vi: "Khánh Hòa, Việt Nam", en: "Khanh Hoa, Vietnam" },
        age: { vi: "18 năm tích trầm", en: "18 years resin formation" },
        scent: { vi: "Gỗ nhẹ, tươi, thanh", en: "Light, fresh wood" },
        weight: { vi: "Chai 10ml", en: "10ml bottle" }
      },
      options: [
        { id: "5", label: { vi: "Chai 5ml", en: "5ml bottle" }, price: 380000, stock: 20 },
        { id: "10", label: { vi: "Chai 10ml", en: "10ml bottle" }, price: 680000, stock: 16 }
      ]
    }),
    P({
      id: "oil-03", sku: "AB-TD03", slug: "tinh-dau-sa-chanh", cat: "essential", sub: "sa",
      name: { vi: "Tinh Dầu Sả Chanh", en: "Lemongrass Essential Oil" },
      subtitle: { vi: "10ml · Thanh lọc, sảng khoái", en: "10ml · Fresh and clarifying" },
      price: 320000, compareAt: null, rating: 4.7, reviewCount: 44, badge: null,
      images: ["assets/images/oil-lemongrass.jpg", "assets/images/oil-dropper.jpg", "assets/images/tea-cup.jpg"],
      short: {
        vi: "Hương sả chanh tươi mát, giúp không gian sạch và tinh thần sảng khoái.",
        en: "Bright lemongrass freshness to clear the room and lift the mind."
      },
      description: {
        vi: "Tinh dầu sả chanh chưng cất từ lá sả tươi, hương sạch, nhẹ và rất dễ chịu.",
        en: "Lemongrass oil distilled from fresh leaves — clean, light and wonderfully easy."
      },
      story: {
        vi: ["Sả chanh được trồng theo phương thức tự nhiên, thu hoạch vào sáng sớm khi tinh dầu trong lá còn đầy. Chưng cất hơi nước giữ lại hương tươi mát đặc trưng.", "Dùng để lau bàn, khuếch tán hoặc phối cùng trầm để tạo không gian vừa ấm vừa sạch."],
        en: ["Lemongrass is grown naturally and harvested at dawn when the leaves are richest in oil. Steam distillation preserves its characteristic freshness.", "Use it for wiping surfaces, diffusing or blending with agarwood for a warm yet clean atmosphere."]
      },
      usage: {
        vi: ["Khuếch tán 4–6 giọt cho 100ml nước.", "Pha loãng trước khi dùng trên da.", "Tránh dùng cho trẻ sơ sinh."],
        en: ["Diffuse 4–6 drops per 100ml water.", "Dilute before applying to skin.", "Avoid use around newborns."]
      },
      specs: {
        origin: { vi: "Bình Mỹ, TP. Hồ Chí Minh", en: "Binh My, Ho Chi Minh City" },
        age: { vi: "Nguyên liệu vụ mới", en: "Fresh harvest" },
        scent: { vi: "Chanh tươi, thanh mát", en: "Fresh, bright lemongrass" },
        weight: { vi: "Chai 10ml", en: "10ml bottle" }
      },
      options: [
        { id: "10", label: { vi: "Chai 10ml", en: "10ml bottle" }, price: 320000, stock: 34 },
        { id: "30", label: { vi: "Chai 30ml", en: "30ml bottle" }, price: 760000, stock: 12 }
      ]
    }),
    P({
      id: "water-01", sku: "AB-NU01", slug: "nuoc-cat-tram-huong", cat: "distilled", sub: "tram-huong",
      name: { vi: "Nước Cất Trầm Hương", en: "Agarwood Distilled Water" },
      subtitle: { vi: "100ml · Thanh tẩy không gian", en: "100ml · Space cleansing" },
      price: 450000, compareAt: null, rating: 4.9, reviewCount: 61, badge: "bestseller",
      images: ["assets/images/oil-amber.jpg", "assets/images/smoke-square.jpg", "assets/images/temple-altar.jpg"],
      short: {
        vi: "Nước cất từ trầm hương nguyên chất, dùng xịt thanh tẩy không gian và tạo cảm giác tĩnh tại.",
        en: "Distilled from pure agarwood, misted to cleanse a space and invite calm."
      },
      description: {
        vi: "Nước cất trầm hương Abodhi được chưng cất từ gỗ trầm già, giữ lại hương thơm nhẹ và khoáng chất tự nhiên.",
        en: "Abodhi agarwood water is distilled from aged agarwood, capturing its delicate aroma and natural minerals."
      },
      story: {
        vi: ["Nước cất trầm hương có hương rất nhẹ, không gây ngậy như tinh dầu. Đây là cách thanh tẩy không gian tinh tế, phù hợp phòng ngủ, phòng thiền và không gian làm việc.", "Có thể xịt quanh phòng, lên đá, vải hoặc dùng trong nghi thức thanh tẩy năng lượng."],
        en: ["Agarwood water is very light, never heavy like oil. It is a subtle way to cleanse bedrooms, meditation rooms and workspaces.", "Mist it around a room, over stones or fabric, or use it in an energy-cleansing ritual."]
      },
      usage: {
        vi: ["Lắc nhẹ trước khi dùng.", "Xịt cách người và vật dụng khoảng 30cm.", "Bảo quản lạnh hoặc nơi thoáng mát; dùng trong 6 tháng sau khi mở."],
        en: ["Shake gently before use.", "Mist from about 30cm away from people and objects.", "Store cool; use within six months of opening."]
      },
      specs: {
        origin: { vi: "Quảng Nam, Việt Nam", en: "Quang Nam, Vietnam" },
        age: { vi: "Trầm 15 năm", en: "15-year agarwood" },
        scent: { vi: "Nhẹ, thanh, thoáng gỗ ấm", en: "Light, clean, warm wood" },
        weight: { vi: "Chai 100ml", en: "100ml bottle" }
      },
      options: [
        { id: "100", label: { vi: "Chai 100ml", en: "100ml bottle" }, price: 450000, stock: 36 },
        { id: "250", label: { vi: "Chai 250ml", en: "250ml bottle" }, price: 990000, stock: 14 }
      ]
    }),
    P({
      id: "water-02", sku: "AB-NU02", slug: "nuoc-cat-ha-kho-thao", cat: "distilled", sub: "ha-kho-thao",
      name: { vi: "Nước Cất Hạ Khô Thảo", en: "Self-Heal Distilled Water" },
      subtitle: { vi: "100ml · Lành dịu", en: "100ml · Gentle and soothing" },
      price: 290000, compareAt: null, rating: 4.8, reviewCount: 33, badge: null,
      images: ["assets/images/water-lemongrass.jpg", "assets/images/tea-amber.jpg", "assets/images/oil-amber.jpg"],
      short: {
        vi: "Nước cất hạ khô thảo dịu nhẹ, hỗ trợ làm sạch và thư giãn.",
        en: "A soft self-heal distillate for cleansing and unwinding."
      },
      description: {
        vi: "Nước cất từ hạ khô thảo được chưng cất nhẹ nhàng, giữ hương thảo mộc thanh và tính dịu lành.",
        en: "Self-heal water is gently distilled to preserve its clean herbal scent and soothing character."
      },
      story: {
        vi: ["Hạ khô thảo là vị thuốc quen thuộc trong y học cổ truyền, thường được dùng để thanh nhiệt. Abodhi chưng cất chậm để giữ hương và tránh mất đi tính dịu.", "Dùng xịt không gian, lau mặt hoặc pha vào nước tắm theo hướng dẫn."],
        en: ["Self-heal is a familiar herb in traditional medicine, often used to cool the body. Abodhi distils slowly to preserve its aroma and gentle nature.", "Mist around the room, use as a facial toner or add to bathwater as directed."]
      },
      usage: {
        vi: ["Xịt trực tiếp lên da hoặc không gian.", "Tránh tiếp xúc mắt và vết thương hở.", "Bảo quản nơi mát, dùng trong 6 tháng sau khi mở."],
        en: ["Mist directly onto skin or into the air.", "Avoid eyes and open wounds.", "Store cool; use within six months of opening."]
      },
      specs: {
        origin: { vi: "Việt Nam", en: "Vietnam" },
        age: { vi: "Thảo mộc vụ mới", en: "Fresh harvest" },
        scent: { vi: "Thảo mộc thanh, dịu", en: "Clean, soft herbal" },
        weight: { vi: "Chai 100ml", en: "100ml bottle" }
      },
      options: [
        { id: "100", label: { vi: "Chai 100ml", en: "100ml bottle" }, price: 290000, stock: 40 },
        { id: "250", label: { vi: "Chai 250ml", en: "250ml bottle" }, price: 650000, stock: 17 }
      ]
    }),
    P({
      id: "water-03", sku: "AB-NU03", slug: "nuoc-cat-que-luong-tu", cat: "distilled", sub: "que-luong-tu",
      name: { vi: "Nước Cất Quế Lượng Tử", en: "Quantum Cinnamon Distilled Water" },
      subtitle: { vi: "100ml · Ấm, thanh lọc", en: "100ml · Warming and clarifying" },
      price: 320000, compareAt: null, rating: 4.7, reviewCount: 27, badge: null,
      images: ["assets/images/water-cinnamon.jpg", "assets/images/oil-amber.jpg", "assets/images/smoke-square.jpg"],
      short: {
        vi: "Hương quế ấm, thanh lọc không gian, tạo cảm giác ấm áp và sạch sẽ.",
        en: "Warm cinnamon aroma to clear a space and create a sense of comfort."
      },
      description: {
        vi: "Nước cất quế lượng tử mang hương quế ấm, dịu và thanh, phù hợp không gian sống và phòng làm việc.",
        en: "Quantum cinnamon water carries a warm, soft cinnamon note for living and working spaces."
      },
      story: {
        vi: ["Quế được chọn từ những thanh vỏ dày, thơm và chưng cất ở nhiệt độ thấp để giữ tinh chất. Hương quế ấm nhưng không nồng, tạo cảm giác dễ chịu.", "Xịt quanh phòng vào buổi sáng hoặc trước khi thiền để tạo không gian ấm và sạch."],
        en: ["Cinnamon is selected from thick, aromatic bark and distilled at low temperature to preserve its essence. The scent is warm without being heavy.", "Mist in the morning or before meditation for a warm, clear atmosphere."]
      },
      usage: {
        vi: ["Lắc đều, xịt quanh không gian.", "Không dùng trực tiếp trên da nhạy cảm.", "Bảo quản nơi mát, tránh ánh nắng."],
        en: ["Shake well and mist around the room.", "Avoid direct use on sensitive skin.", "Store cool, away from sunlight."]
      },
      specs: {
        origin: { vi: "Việt Nam", en: "Vietnam" },
        age: { vi: "Quế vụ mới", en: "Fresh harvest" },
        scent: { vi: "Quế ấm, dịu, thanh", en: "Warm, soft cinnamon" },
        weight: { vi: "Chai 100ml", en: "100ml bottle" }
      },
      options: [
        { id: "100", label: { vi: "Chai 100ml", en: "100ml bottle" }, price: 320000, stock: 32 },
        { id: "250", label: { vi: "Chai 250ml", en: "250ml bottle" }, price: 720000, stock: 13 }
      ]
    }),
    P({
      id: "water-04", sku: "AB-NU04", slug: "nuoc-thanh-tay-nang-luong", cat: "distilled", sub: "thanh-tay",
      name: { vi: "Nước Thanh Tẩy Năng Lượng", en: "Energy Cleansing Water" },
      subtitle: { vi: "100ml · Trầm & thảo mộc", en: "100ml · Agarwood & herbs" },
      price: 380000, compareAt: null, rating: 4.9, reviewCount: 49, badge: "new",
      images: ["assets/images/smoke-square.jpg", "assets/images/oil-amber.jpg", "assets/images/meditation-monk.jpg"],
      short: {
        vi: "Sự kết hợp trầm hương và thảo mộc, dùng thanh tẩy không gian và nạp lại năng lượng.",
        en: "Agarwood and herbs blended to cleanse a space and restore energy."
      },
      description: {
        vi: "Nước thanh tẩy năng lượng Abodhi kết hợp nước cất trầm hương, hạ khô thảo và một số thảo mộc thanh nhẹ.",
        en: "Abodhi cleansing water combines agarwood distillate, self-heal and other light herbs."
      },
      story: {
        vi: ["Công thức được phối từ những nguyên liệu có hương thanh và tính dịu, dùng trong nghi thức làm sạch không gian sống, phòng thiền hoặc sau khi tiếp xúc với đám đông.", "Hương nhẹ, không gây gắt. Có thể dùng như một nghi thức nhỏ để đánh dấu sự chuyển tiếp giữa các trạng thái trong ngày."],
        en: ["The formula blends clean, gentle botanicals for rituals that clear a home, meditation room or the feeling of a crowded day.", "The scent is soft, never sharp — a small ritual to mark transitions through the day."]
      },
      usage: {
        vi: ["Xịt quanh phòng từ góc ra cửa.", "Có thể xịt lên đá, gỗ hoặc không gian thiền.", "Tránh xịt trực tiếp lên da và mắt."],
        en: ["Mist around the room, working from the corners toward the door.", "Use on stones, wood or in a meditation space.", "Avoid direct contact with skin and eyes."]
      },
      specs: {
        origin: { vi: "Việt Nam", en: "Vietnam" },
        age: { vi: "Trầm 12 năm", en: "12-year agarwood" },
        scent: { vi: "Thanh, thoáng, thảo mộc nhẹ", en: "Clean, airy, light herbs" },
        weight: { vi: "Chai 100ml", en: "100ml bottle" }
      },
      options: [
        { id: "100", label: { vi: "Chai 100ml", en: "100ml bottle" }, price: 380000, stock: 25 },
        { id: "250", label: { vi: "Chai 250ml", en: "250ml bottle" }, price: 840000, stock: 9 }
      ]
    }),
    P({
      id: "jew-01", sku: "AB-VT01", slug: "vong-tay-tram-chim-dau-thanh-tu", cat: "jewelry", sub: "vong-6-8",
      name: { vi: "Vòng Tay Trầm Hương Chìm Dầu Thanh Tú (6–14li)", en: "Thanh Tu Sinking Agarwood Bracelet (6–14mm)" },
      subtitle: { vi: "Chìm dầu · Tự chọn size 6–14li & số hạt", en: "Sinking grade · Choose 6–14mm & bead count" },
      price: 1850000, compareAt: 2200000, rating: 5.0, reviewCount: 142, badge: "bestseller", jewelry: true,
      images: ["assets/images/beads-bracelet.jpg", "assets/images/jewelry-gold.jpg", "assets/images/beads-pair.jpg"],
      short: {
        vi: "Thiết kế thanh mảnh tôn lên cổ tay, sớ dầu tự nhiên sắc nét, hương thơm ngọt dịu theo thân nhiệt.",
        en: "A slender silhouette with crisp resin grains and a soft sweetness released by body heat."
      },
      description: {
        vi: "Chế tác từ phôi trầm tốc kiến già dầu tự nhiên, hạt tiện tròn đều thủ công và đánh bóng bằng nhám mịn tự nhiên, không phủ bóng hóa học.",
        en: "Crafted from aged, resin-rich agarwood, each bead is turned by hand and polished with fine natural abrasives — never coated."
      },
      story: {
        vi: ["Mỗi hạt trầm được tuyển chọn để đồng đều về sắc độ và trọng lượng. Vòng 6–8li thanh mảnh, 10–14li đĩnh đạc hơn, cùng giữ vẻ đẹp mộc mạc của gỗ trầm.", "Hương trầm tỏa ra tự nhiên khi đeo, đặc biệt khi da ấm. Càng sử dụng, bề mặt hạt càng lên bóng nhẹ theo thời gian."],
        en: ["Beads are selected for consistent colour and weight. The 6–8mm sizes feel slender; 10–14mm sits more substantially on the wrist. All keep the raw beauty of agarwood.", "Agarwood releases its scent naturally with body heat. With wear, the beads develop a gentle patina over time."]
      },
      usage: {
        vi: ["Chọn kích thước hạt và số hạt phù hợp với cổ tay.", "Tránh ngâm nước, xà phòng mạnh hoặc hóa chất.", "Bảo quản trong hộp kín khi không đeo; lau bằng vải mềm."],
        en: ["Choose bead size and count to suit your wrist.", "Avoid soaking in water, harsh soap or chemicals.", "Store in the box when not worn; wipe with a soft cloth."]
      },
      specs: {
        origin: { vi: "Quảng Nam, Việt Nam", en: "Quang Nam, Vietnam" },
        age: { vi: "22 năm tích trầm", en: "22 years resin formation" },
        scent: { vi: "Ngọt sữa dịu nhẹ, tỏa theo thân nhiệt", en: "Soft milky sweetness, warmed by skin" },
        weight: { vi: "Tùy kích thước & số hạt", en: "Varies by size and bead count" }
      },
      jewelrySpec: {
        sizes: [
          { id: "6li", label: { vi: "6 li", en: "6mm" }, add: 0, stock: 22, note: { vi: "Cổ tay 13–15cm", en: "Wrist 13–15cm" } },
          { id: "8li", label: { vi: "8 li", en: "8mm" }, add: 300000, stock: 16, note: { vi: "Cổ tay 15–17cm", en: "Wrist 15–17cm" } },
          { id: "10li", label: { vi: "10 li", en: "10mm" }, add: 950000, stock: 10, note: { vi: "Cổ tay 16–18cm", en: "Wrist 16–18cm" } },
          { id: "12li", label: { vi: "12 li", en: "12mm" }, add: 1700000, stock: 6, note: { vi: "Cổ tay 17–19cm", en: "Wrist 17–19cm" } },
          { id: "14li", label: { vi: "14 li", en: "14mm" }, add: 2600000, stock: 3, note: { vi: "Cổ tay 18–20cm", en: "Wrist 18–20cm" } }
        ],
        counts: [
          { id: "21", label: { vi: "21 hạt", en: "21 beads" }, price: 1850000, stock: 28 },
          { id: "54", label: { vi: "54 hạt", en: "54 beads" }, price: 3500000, stock: 9 },
          { id: "108", label: { vi: "108 hạt", en: "108 beads" }, price: 5150000, stock: 3 }
        ]
      }
    }),
    P({
      id: "jew-02", sku: "AB-VT02", slug: "vong-tay-tram-10li-12li-dinh-dac", cat: "jewelry", sub: "vong-10-12",
      name: { vi: "Vòng Tay Trầm Hương 10li – 12li Đĩnh Đạc", en: "Dinh Dac Agarwood Bracelet 10–12mm" },
      subtitle: { vi: "Tốc kiến · Vân dầu đan dày", en: "Aged resin · Dense grain" },
      price: 3450000, compareAt: 3900000, rating: 4.9, reviewCount: 96, badge: null, jewelry: true,
      images: ["assets/images/beads-pair.jpg", "assets/images/jewelry-diamond.jpg", "assets/images/beads-hand.jpg"],
      short: {
        vi: "Kích thước hạt chuẩn mực cho nam giới và doanh nhân, vân dầu đan dày, năng lượng bình an.",
        en: "A confident scale for men and collectors, with dense resin grain and grounded energy."
      },
      description: {
        vi: "Từng hạt trầm 10li và 12li được cắt từ cùng một khối phôi trầm tự nhiên để đảm bảo sự đồng nhất về vân gỗ và mùi hương.",
        en: "10mm and 12mm beads are cut from the same agarwood block for a consistent grain and scent."
      },
      story: {
        vi: ["Vòng Đĩnh Đạc dành cho người thích cảm giác chắc tay và phong thái điềm tĩnh. Hạt lớn hơn giữ được nhiều nhựa trầm hơn, hương cũng đậm và ấm hơn.", "Vân dầu trên mỗi hạt là dấu vết của thời gian, không có hai chiếc vòng nào hoàn toàn giống nhau."],
        en: ["Dinh Dac is for those who prefer a substantial weight and a calm presence. Larger beads hold more resin, giving a deeper, warmer scent.", "The resin pattern on each bead is a trace of time; no two bracelets are ever identical."]
      },
      usage: {
        vi: ["Chọn size 10li, 12li hoặc 14li và số hạt mong muốn.", "Tránh va đập mạnh và tiếp xúc hóa chất.", "Lau khô bằng vải mềm, bảo quản hộp kín."],
        en: ["Choose 10mm, 12mm or 14mm and your preferred bead count.", "Avoid hard impact and chemical contact.", "Wipe dry with a soft cloth and store in the box."]
      },
      specs: {
        origin: { vi: "Khánh Hòa, Việt Nam", en: "Khanh Hoa, Vietnam" },
        age: { vi: "25 năm tích trầm", en: "25 years resin formation" },
        scent: { vi: "Trầm ấm, ngọt sâu, hậu vị cay nhẹ", en: "Warm, deep sweetness with a faint spice" },
        weight: { vi: "Tùy kích thước & số hạt", en: "Varies by size and bead count" }
      },
      jewelrySpec: {
        sizes: [
          { id: "10li", label: { vi: "10 li", en: "10mm" }, add: 0, stock: 14, note: { vi: "Cổ tay 16–18cm", en: "Wrist 16–18cm" } },
          { id: "12li", label: { vi: "12 li", en: "12mm" }, add: 800000, stock: 8, note: { vi: "Cổ tay 17–19cm", en: "Wrist 17–19cm" } },
          { id: "14li", label: { vi: "14 li", en: "14mm" }, add: 1650000, stock: 4, note: { vi: "Cổ tay 18–20cm", en: "Wrist 18–20cm" } }
        ],
        counts: [
          { id: "21", label: { vi: "21 hạt", en: "21 beads" }, price: 3450000, stock: 18 },
          { id: "54", label: { vi: "54 hạt", en: "54 beads" }, price: 5950000, stock: 6 },
          { id: "108", label: { vi: "108 hạt", en: "108 beads" }, price: 8900000, stock: 2 }
        ]
      }
    }),
    P({
      id: "jew-03", sku: "AB-CS03", slug: "chuoi-tram-108-hat-an-nhien", cat: "jewelry", sub: "chuoi-108",
      name: { vi: "Chuỗi Trầm Hương 108 Hạt An Nhiên", en: "An Nhien 108-Bead Agarwood Mala" },
      subtitle: { vi: "6li / 8li · Trì chú thiền định", en: "6mm / 8mm · For meditation" },
      price: 4600000, compareAt: null, rating: 5.0, reviewCount: 58, badge: "limited", jewelry: true,
      images: ["assets/images/jewelry-mala.jpg", "assets/images/beads-hand.jpg", "assets/images/beads-bracelet.jpg"],
      short: {
        vi: "Quấn 4 vòng cổ tay hoặc đeo cổ trì chú, mang ý nghĩa đoạn trừ 108 phiền não.",
        en: "Wrap four times or wear as a mala — a traditional symbol of releasing the 108 afflictions."
      },
      description: {
        vi: "Chuỗi 108 hạt trầm hương tự nhiên được nghệ nhân Abodhi tuyển chọn đồng đều, đi kèm hộp gấm và dây dự phòng.",
        en: "A 108-bead mala of natural agarwood, hand-selected for consistency and presented in a brocade box with a spare cord."
      },
      story: {
        vi: ["Chuỗi 108 hạt là vật dụng quen thuộc trong thiền định và trì chú. Mỗi hạt trầm được xâu tay, tạo cảm giác cân bằng và nhịp nhàng khi lần chuỗi.", "Đi kèm hộp gấm sang trọng, phù hợp làm quà tặng cho người thực hành thiền, tu tập hoặc người yêu trầm."],
        en: ["A 108-bead mala is a familiar companion in meditation and chanting. Each agarwood bead is strung by hand, creating a balanced rhythm in use.", "Presented in a brocade box, it is a meaningful gift for practitioners, collectors and anyone drawn to agarwood."]
      },
      usage: {
        vi: ["Chọn size 6li hoặc 8li và số hạt.", "Dùng để lần chuỗi, thiền hoặc đeo như trang sức.", "Giữ khô, tránh nước hoa và nhiệt độ cao."],
        en: ["Choose 6mm or 8mm and bead count.", "Use for counting, meditation or wear as jewellery.", "Keep dry and away from perfume and heat."]
      },
      specs: {
        origin: { vi: "Quảng Nam, Việt Nam", en: "Quang Nam, Vietnam" },
        age: { vi: "25 năm tích trầm", en: "25 years resin formation" },
        scent: { vi: "Ngọt dịu thanh khiết, an thần định tâm", en: "Clean, soft sweetness that settles the mind" },
        weight: { vi: "Tùy size · hộp gấm", en: "Varies by size · brocade box" }
      },
      jewelrySpec: {
        sizes: [
          { id: "6li", label: { vi: "6 li", en: "6mm" }, add: 0, stock: 9, note: { vi: "Quấn 4 vòng", en: "Four wraps" } },
          { id: "8li", label: { vi: "8 li", en: "8mm" }, add: 750000, stock: 5, note: { vi: "Quấn 3 vòng", en: "Three wraps" } }
        ],
        counts: [
          { id: "21", label: { vi: "21 hạt", en: "21 beads" }, price: 1900000, stock: 12 },
          { id: "54", label: { vi: "54 hạt", en: "54 beads" }, price: 3150000, stock: 7 },
          { id: "108", label: { vi: "108 hạt", en: "108 beads" }, price: 4600000, stock: 4 }
        ]
      }
    }),
    P({
      id: "jew-04", sku: "AB-PH04", slug: "phoi-hat-tram-tuyen-chon", cat: "jewelry", sub: "phoi-hat",
      name: { vi: "Phôi Hạt Trầm Rừng Tuyển Chọn", en: "Selected Wild Agarwood Beads" },
      subtitle: { vi: "Chế tác riêng · Giữ vỏ tự nhiên", en: "For custom work · Natural surface" },
      price: 2900000, compareAt: null, rating: 4.8, reviewCount: 24, badge: null, jewelry: true,
      images: ["assets/images/beads-hand.jpg", "assets/images/beads-jade.jpg", "assets/images/jewelry-pendant.jpg"],
      short: {
        vi: "Phôi hạt thô chưa xử lý bề mặt, giữ nguyên lớp vỏ dầu tự nhiên cho người sưu tầm phối charm.",
        en: "Raw, unfinished beads with their natural resin surface — ready for charms and custom settings."
      },
      description: {
        vi: "Dành cho khách hàng yêu thích vẻ đẹp nguyên sơ hoặc muốn tự phối hợp cùng charm vàng, bạc Thái theo bản mệnh.",
        en: "For those who love a raw aesthetic or wish to pair agarwood with gold or Thai silver charms."
      },
      story: {
        vi: ["Phôi hạt được giữ nguyên bề mặt tự nhiên, không đánh bóng để bảo toàn lớp nhựa trầm và vân gỗ. Đây là chất liệu lý tưởng cho người muốn tự thiết kế trang sức.", "Abodhi có thể tư vấn phối charm, dây và kích thước theo bản mệnh hoặc phong cách riêng."],
        en: ["The beads keep their natural surface, unpolished, to preserve the resin layer and grain. An ideal material for designing your own jewellery.", "Abodhi can advise on charms, cords and sizes to suit your element or personal style."]
      },
      usage: {
        vi: ["Chọn size và số hạt làm nền cho thiết kế.", "Trao đổi với Abodhi nếu cần phối charm hoặc dây.", "Tránh ngâm nước, hóa chất và va đập mạnh."],
        en: ["Choose size and count as the base of your design.", "Contact Abodhi for charm and cord pairing.", "Avoid water, chemicals and hard impact."]
      },
      specs: {
        origin: { vi: "Gia Lai, Việt Nam", en: "Gia Lai, Vietnam" },
        age: { vi: "20+ năm tích trầm", en: "20+ years resin formation" },
        scent: { vi: "Hương gỗ rừng nguyên bản, đậm vị nhựa trầm", en: "Raw forest wood, deep resin" },
        weight: { vi: "Tùy kích thước & số hạt", en: "Varies by size and bead count" }
      },
      jewelrySpec: {
        sizes: [
          { id: "8li", label: { vi: "8 li", en: "8mm" }, add: 0, stock: 18, note: { vi: "Phôi thô", en: "Raw bead" } },
          { id: "10li", label: { vi: "10 li", en: "10mm" }, add: 350000, stock: 12, note: { vi: "Phôi thô", en: "Raw bead" } },
          { id: "12li", label: { vi: "12 li", en: "12mm" }, add: 750000, stock: 6, note: { vi: "Phôi thô", en: "Raw bead" } }
        ],
        counts: [
          { id: "21", label: { vi: "21 hạt", en: "21 beads" }, price: 2900000, stock: 10 },
          { id: "54", label: { vi: "54 hạt", en: "54 beads" }, price: 4900000, stock: 5 },
          { id: "108", label: { vi: "108 hạt", en: "108 beads" }, price: 7600000, stock: 2 }
        ]
      }
    }),
    P({
      id: "soap-01", sku: "AB-XB01", slug: "xa-bong-tram-go-thom", cat: "soap", sub: "go-thom",
      name: { vi: "Xà Bông Trầm Hương Gỗ Thơm", en: "Agarwood & Woody Soap" },
      subtitle: { vi: "Bánh 100g · Cold process", en: "100g bar · Cold process" },
      price: 180000, compareAt: 210000, rating: 4.9, reviewCount: 88, badge: "bestseller",
      images: ["assets/images/soap-forest.jpg", "assets/images/soap-healing.jpg", "assets/images/agarwood-close.jpg"],
      short: {
        vi: "Xà bông cold process với trầm hương và gỗ thơm, làm sạch dịu nhẹ, lưu hương ấm.",
        en: "A cold-process bar with agarwood and aromatic woods — gentle cleansing with a warm trail."
      },
      description: {
        vi: "Xà bông trầm hương gỗ thơm được làm lạnh, giữ glycerin tự nhiên và hương gỗ ấm dịu.",
        en: "Cold-processed agarwood soap retains natural glycerin and a warm woody scent."
      },
      story: {
        vi: ["Chúng tôi sử dụng dầu thực vật, bơ hạt mỡ và bột trầm hương mịn, không hương liệu tổng hợp. Bánh xà bông có độ pH dịu, phù hợp da thường và da khô.", "Hương gỗ ấm lưu lại nhẹ trên da sau khi tắm, tạo cảm giác sạch và dễ chịu."],
        en: ["We use plant oils, shea butter and fine agarwood powder, with no synthetic fragrance. The bar has a gentle pH and suits normal to dry skin.", "A warm woody trail lingers lightly on the skin after washing."]
      },
      usage: {
        vi: ["Làm ướt da, tạo bọt và massage nhẹ.", "Rửa sạch với nước ấm.", "Để xà bông khô trên giá thoát nước sau khi dùng."],
        en: ["Wet the skin, lather and massage gently.", "Rinse with warm water.", "Let the bar dry on a draining dish after use."]
      },
      specs: {
        origin: { vi: "TP. Hồ Chí Minh, Việt Nam", en: "Ho Chi Minh City, Vietnam" },
        age: { vi: "Trầm 12 năm", en: "12-year agarwood" },
        scent: { vi: "Gỗ thơm ấm, dịu nhẹ", en: "Warm, soft aromatic wood" },
        weight: { vi: "Bánh 100g", en: "100g bar" }
      },
      options: [
        { id: "1", label: { vi: "1 bánh 100g", en: "1 bar · 100g" }, price: 180000, compareAt: 210000, stock: 48 },
        { id: "3", label: { vi: "Set 3 bánh", en: "Set of 3" }, price: 495000, stock: 20 },
        { id: "6", label: { vi: "Set 6 bánh", en: "Set of 6" }, price: 930000, stock: 10 }
      ]
    }),
    P({
      id: "soap-02", sku: "AB-XB02", slug: "xa-bong-sa-hoa-hong", cat: "soap", sub: "sa-hoa-hong",
      name: { vi: "Xà Bông Trầm Hương & Sả Hoa Hồng", en: "Agarwood, Lemongrass & Rose Soap" },
      subtitle: { vi: "Bánh 100g · Hoa hồng sấy", en: "100g bar · Dried rose" },
      price: 195000, compareAt: null, rating: 4.8, reviewCount: 52, badge: "new",
      images: ["assets/images/soap-rose.jpg", "assets/images/soap-forest.jpg", "assets/images/soap-healing.jpg"],
      short: {
        vi: "Sả chanh và hoa hồng kết hợp trầm hương, làm sạch dịu và để lại hương thơm nữ tính.",
        en: "Lemongrass and rose meet agarwood in a gentle cleanse with a softly feminine trail."
      },
      description: {
        vi: "Sự kết hợp giữa tinh dầu sả chanh, cánh hồng sấy và trầm hương tạo nên bánh xà bông thơm dịu, thanh mát.",
        en: "Lemongrass oil, dried rose petals and agarwood create a soft, fresh bar."
      },
      story: {
        vi: ["Cánh hồng được rắc thủ công trên mặt bánh, tạo vẻ đẹp tự nhiên và hương hoa nhẹ. Tinh dầu sả giúp làm sạch và tạo cảm giác tươi mới.", "Phù hợp làm quà tặng nhỏ, quà lưu niệm hoặc chăm sóc da hằng ngày."],
        en: ["Rose petals are scattered by hand across each bar for natural beauty and a light floral note. Lemongrass oil brings freshness and cleansing.", "A lovely small gift, keepsake or everyday skin ritual."]
      },
      usage: {
        vi: ["Tạo bọt với nước ấm, massage nhẹ toàn thân.", "Tránh tiếp xúc trực tiếp với mắt.", "Bảo quản nơi khô ráo."],
        en: ["Lather with warm water and massage gently.", "Avoid direct contact with eyes.", "Store in a dry place."]
      },
      specs: {
        origin: { vi: "TP. Hồ Chí Minh, Việt Nam", en: "Ho Chi Minh City, Vietnam" },
        age: { vi: "Trầm 12 năm", en: "12-year agarwood" },
        scent: { vi: "Hoa hồng nhẹ, sả thanh, trầm ấm", en: "Light rose, fresh lemongrass, warm agarwood" },
        weight: { vi: "Bánh 100g", en: "100g bar" }
      },
      options: [
        { id: "1", label: { vi: "1 bánh 100g", en: "1 bar · 100g" }, price: 195000, stock: 36 },
        { id: "3", label: { vi: "Set 3 bánh", en: "Set of 3" }, price: 540000, stock: 18 },
        { id: "6", label: { vi: "Set 6 bánh", en: "Set of 6" }, price: 1020000, stock: 8 }
      ]
    }),
    P({
      id: "soap-03", sku: "AB-XB03", slug: "xa-bong-hoa-chua-lanh", cat: "soap", sub: "hoa-chua-lanh",
      name: { vi: "Xà Bông Trầm Hương Hoa Chữa Lành", en: "Agarwood & Healing Flower Soap" },
      subtitle: { vi: "Bánh 100g · Hạ khô thảo", en: "100g bar · Self-heal" },
      price: 210000, compareAt: null, rating: 4.8, reviewCount: 39, badge: null,
      images: ["assets/images/soap-healing.jpg", "assets/images/soap-forest.jpg", "assets/images/water-lemongrass.jpg"],
      short: {
        vi: "Hạ khô thảo và trầm hương trong bánh xà bông dịu nhẹ, phù hợp da nhạy cảm.",
        en: "Self-heal and agarwood in a gentle bar made with sensitive skin in mind."
      },
      description: {
        vi: "Xà bông trầm hương hoa chữa lành kết hợp hạ khô thảo, giúp làm sạch dịu và giữ ẩm tự nhiên.",
        en: "Agarwood and self-heal combine in a soap that cleanses gently and supports natural moisture."
      },
      story: {
        vi: ["Hạ khô thảo được nấu cùng dầu thực vật để chiết xuất tinh chất, sau đó kết hợp bột trầm hương mịn. Bánh xà bông có màu nâu nhạt tự nhiên, không phẩm màu.", "Dịu nhẹ cho da nhạy cảm, phù hợp dùng hằng ngày cho cả gia đình."],
        en: ["Self-heal is infused into plant oils, then blended with fine agarwood powder. The bar has a natural pale-brown colour with no added dye.", "Gentle enough for sensitive skin and suitable for daily family use."]
      },
      usage: {
        vi: ["Dùng như xà bông tắm thông thường.", "Với da nhạy cảm, thử trên vùng da nhỏ trước.", "Giữ bánh khô giữa các lần dùng."],
        en: ["Use as a regular body soap.", "For sensitive skin, patch-test on a small area first.", "Keep the bar dry between uses."]
      },
      specs: {
        origin: { vi: "TP. Hồ Chí Minh, Việt Nam", en: "Ho Chi Minh City, Vietnam" },
        age: { vi: "Trầm 12 năm", en: "12-year agarwood" },
        scent: { vi: "Thảo mộc dịu, trầm nhẹ", en: "Soft herbs, light agarwood" },
        weight: { vi: "Bánh 100g", en: "100g bar" }
      },
      options: [
        { id: "1", label: { vi: "1 bánh 100g", en: "1 bar · 100g" }, price: 210000, stock: 28 },
        { id: "3", label: { vi: "Set 3 bánh", en: "Set of 3" }, price: 585000, stock: 14 },
        { id: "6", label: { vi: "Set 6 bánh", en: "Set of 6" }, price: 1110000, stock: 6 }
      ]
    }),
    P({
      id: "art-01", sku: "AB-MN01", slug: "tuong-phat-quan-the-am", cat: "art", sub: "tuong",
      name: { vi: "Tượng Phật Quán Thế Âm Trầm Hương Nguyên Khối", en: "Guanyin Agarwood Statue" },
      subtitle: { vi: "Tác phẩm độc bản · Liên hệ", en: "One-of-a-kind · Enquire" },
      price: null, compareAt: null, rating: 5.0, reviewCount: 12, badge: "oneofakind", contactOnly: true,
      images: ["assets/images/carving-wood.jpg", "assets/images/agarwood-close.jpg", "assets/images/temple-altar.jpg"],
      short: {
        vi: "Tác phẩm điêu khắc thủ công độc bản bởi nghệ nhân 30 năm kinh nghiệm, tỏa hương tự nhiên.",
        en: "A one-of-a-kind hand carving by a master with 30 years of experience, naturally fragrant."
      },
      description: {
        vi: "Mỗi khối trầm cảnh nguyên khối là một kỳ tác của thiên nhiên. Nghệ nhân Abodhi nương theo thế gỗ và mạch dầu tự nhiên để chạm khắc diện Phật từ bi, thanh tịnh.",
        en: "Every block of agarwood is a singular act of nature. Abodhi's craftsman follows the wood and its resin veins to carve a serene, compassionate face."
      },
      story: {
        vi: ["Tượng Quán Thế Âm được chạm khắc từ một khối trầm nguyên, không ghép. Thời gian hoàn thiện một tác phẩm có thể kéo dài nhiều tháng tùy vào thế gỗ.", "Vì là tác phẩm độc bản, kích thước, vân và hương thơm của mỗi tượng là duy nhất. Abodhi mời quý khách liên hệ để xem tác phẩm hiện có hoặc đặt một tác phẩm riêng."],
        en: ["The Guanyin is carved from a single block of agarwood, never joined. Completing one piece can take months depending on the wood's form.", "As a one-of-a-kind work, size, grain and scent are unique to each statue. Abodhi invites you to enquire about available pieces or a private commission."]
      },
      usage: {
        vi: ["Trưng bày ở nơi trang trọng, tránh ánh nắng trực tiếp.", "Giữ độ ẩm ổn định, tránh điều hòa quá khô.", "Lau bụi bằng cọ mềm; không dùng hóa chất."],
        en: ["Display in a place of honour away from direct sunlight.", "Keep humidity stable and avoid very dry air-conditioning.", "Dust with a soft brush; never use chemicals."]
      },
      specs: {
        origin: { vi: "Khánh Hòa, Việt Nam", en: "Khanh Hoa, Vietnam" },
        age: { vi: "Trên 40 năm tích trầm", en: "Over 40 years resin formation" },
        scent: { vi: "Hương trầm cổ thụ lan tỏa vĩnh cửu", en: "Ancient agarwood, a lasting presence" },
        weight: { vi: "Kích thước & trọng lượng theo tác phẩm", en: "Dimensions and weight vary by piece" }
      }
    }),
    P({
      id: "art-02", sku: "AB-MN02", slug: "tac-pham-tram-dat-theo-yeu-cau", cat: "art", sub: "dat-rieng",
      name: { vi: "Tác Phẩm Trầm Đặt Theo Yêu Cầu", en: "Bespoke Agarwood Commission" },
      subtitle: { vi: "Thiết kế riêng · Báo giá theo yêu cầu", en: "Private design · Quote on request" },
      price: null, compareAt: null, rating: 5.0, reviewCount: 9, badge: "bespoke", quoteOnly: true,
      images: ["assets/images/agarwood-log.jpg", "assets/images/agarwood-close.jpg", "assets/images/carving-wood.jpg"],
      short: {
        vi: "Từ một câu chuyện, một dịp tặng hoặc một không gian, Abodhi cùng bạn tạo nên tác phẩm trầm duy nhất.",
        en: "From a story, a gift or a space, Abodhi creates a singular agarwood work with you."
      },
      description: {
        vi: "Dịch vụ đặt chế tác mỹ nghệ trầm theo yêu cầu: từ tượng, phù điêu, khối cảnh đến quà tặng doanh nghiệp. Nghệ nhân tư vấn chất liệu, kích thước và ngân sách.",
        en: "A bespoke agarwood art service: statues, reliefs, sculptural pieces and corporate gifts. Our craftsmen advise on material, scale and budget."
      },
      story: {
        vi: ["Mỗi yêu cầu đặt riêng bắt đầu bằng một cuộc trò chuyện. Chúng tôi lắng nghe câu chuyện, xem không gian đặt tác phẩm và lựa chọn phôi trầm phù hợp.", "Sau đó, nghệ nhân phác thảo, trao đổi với khách và bắt đầu chế tác. Thời gian hoàn thiện thường từ 4 đến 12 tuần tùy độ phức tạp."],
        en: ["Every commission begins with a conversation. We listen to the story, consider the space and select a suitable agarwood block.", "The craftsman then sketches, refines the idea with you and begins carving. Completion usually takes four to twelve weeks depending on complexity."]
      },
      usage: {
        vi: ["Điền form yêu cầu báo giá với kích thước, chất liệu và câu chuyện.", "Abodhi liên hệ trong 24 giờ làm việc để tư vấn.", "Xác nhận phác thảo, tiến độ và chi phí trước khi chế tác."],
        en: ["Submit the quote form with dimensions, material and your story.", "Abodhi will contact you within 24 working hours.", "Approve the sketch, timeline and cost before carving begins."]
      },
      specs: {
        origin: { vi: "Việt Nam", en: "Vietnam" },
        age: { vi: "Tùy phôi trầm tuyển chọn", en: "Selected agarwood, varies" },
        scent: { vi: "Tự nhiên, theo phôi trầm", en: "Natural, depending on the wood" },
        weight: { vi: "Theo thiết kế", en: "By design" }
      }
    }),
    P({
      id: "art-03", sku: "AB-MN03", slug: "phoi-tram-canh-suu-tam", cat: "art", sub: "phoi-canh",
      name: { vi: "Phôi Trầm Cảnh Sưu Tầm", en: "Collector Agarwood Sculpture" },
      subtitle: { vi: "Nguyên khối · Độc bản", en: "Solid block · Unique" },
      price: 8900000, compareAt: null, rating: 5.0, reviewCount: 7, badge: "oneofakind",
      images: ["assets/images/agarwood-log.jpg", "assets/images/agarwood-close.jpg", "assets/images/carving-wood.jpg"],
      short: {
        vi: "Khối trầm cảnh nguyên bản giữ trọn hình dáng tự nhiên, dành cho người sưu tầm và không gian thiền.",
        en: "A raw agarwood sculpture preserving its natural form — for collectors and contemplative spaces."
      },
      description: {
        vi: "Khối trầm cảnh được giữ nguyên hình dáng, chỉ làm sạch và đánh bóng nhẹ để tôn lên vân gỗ và mạch dầu.",
        en: "The block is left in its natural form, cleaned and lightly polished to reveal grain and resin veins."
      },
      story: {
        vi: ["Đây là tác phẩm của tự nhiên hơn là bàn tay con người. Mỗi khối trầm cảnh có hình dáng, màu sắc và mùi hương riêng, không thể tái tạo.", "Phù hợp trưng bày trong phòng khách, phòng trà hoặc không gian thiền. Kích thước và trọng lượng của từng khối là duy nhất."],
        en: ["This is a work of nature more than of human hands. Each block has its own shape, colour and scent, impossible to replicate.", "Beautiful in a living room, tea room or meditation space. Size and weight are unique to each piece."]
      },
      usage: {
        vi: ["Trưng bày nơi thoáng, tránh nắng trực tiếp.", "Không ngâm nước hoặc dùng hóa chất tẩy rửa.", "Lau bụi bằng cọ mềm."],
        en: ["Display in a ventilated spot away from direct sun.", "Do not soak or use cleaning chemicals.", "Dust with a soft brush."]
      },
      specs: {
        origin: { vi: "Gia Lai, Việt Nam", en: "Gia Lai, Vietnam" },
        age: { vi: "30+ năm tích trầm", en: "30+ years resin formation" },
        scent: { vi: "Gỗ trầm cổ, nhựa thơm sâu", en: "Ancient wood, deep resin" },
        weight: { vi: "Theo từng khối", en: "Varies by piece" }
      }
    }),
    P({
      id: "acc-01", sku: "AB-PK01", slug: "lu-xong-tram-tu-sa", cat: "accessories", sub: "lu-huong",
      name: { vi: "Lư Xông Trầm Gốm Tử Sa", en: "Zisha Ceramic Incense Burner" },
      subtitle: { vi: "Nắp đồng khắc hoa sen", en: "Bronze lotus lid" },
      price: 680000, compareAt: null, rating: 4.9, reviewCount: 46, badge: "bestseller",
      images: ["assets/images/burner-ceramic.jpg", "assets/images/burner-sculpture.jpg", "assets/images/burner-bronze.jpg"],
      short: {
        vi: "Chất gốm giữ nhiệt ổn định, nắp đồng chạm trổ tinh xảo cho làn khói nghệ thuật.",
        en: "Stable ceramic heat and a finely chased bronze lid for sculptural smoke."
      },
      description: {
        vi: "Lư xông trầm gốm tử sa với nắp đồng khắc hoa sen, giúp trầm cháy đều và tạo dòng khói đẹp.",
        en: "A zisha ceramic burner with a lotus-engraved bronze lid that keeps incense burning evenly and shapes the smoke."
      },
      story: {
        vi: ["Gốm tử sa được nung ở nhiệt độ cao, giữ nhiệt tốt và không làm biến đổi hương trầm. Nắp đồng được chạm khắc thủ công với họa tiết hoa sen.", "Đi kèm miếng lót chống cháy, phù hợp đốt nụ trầm, nhang vòng hoặc trầm miếng."],
        en: ["Zisha clay is fired at high temperature to hold heat without altering the agarwood scent. The bronze lid is hand-chased with a lotus motif.", "Supplied with a heatproof pad, suitable for cones, coils or agarwood chips."]
      },
      usage: {
        vi: ["Đặt miếng lót chống cháy vào lòng lư.", "Đặt nụ hoặc khoanh trầm lên trên.", "Đậy nắp và để khói thoát qua lỗ khắc."],
        en: ["Place the heatproof pad inside the burner.", "Set a cone or coil on top.", "Replace the lid and let smoke escape through the carved openings."]
      },
      specs: {
        origin: { vi: "Chế tác thủ công", en: "Handcrafted" },
        age: { vi: "Gốm nung 1250°C", en: "Fired at 1250°C" },
        scent: { vi: "Trung tính, không lẫn mùi", en: "Neutral, no added scent" },
        weight: { vi: "Đường kính 11cm · cao 14cm", en: "11cm diameter · 14cm high" }
      },
      options: [
        { id: "standard", label: { vi: "Tiêu chuẩn", en: "Standard" }, price: 680000, stock: 15 },
        { id: "gift", label: { vi: "Set quà tặng + nụ trầm", en: "Gift set + incense cones" }, price: 980000, stock: 8 }
      ]
    }),
    P({
      id: "acc-02", sku: "AB-PK02", slug: "khay-dot-tram-tro-nui", cat: "accessories", sub: "khay-dot",
      name: { vi: "Khay Đốt Trầm & Tro Núi", en: "Incense Tray & Mountain Ash" },
      subtitle: { vi: "Gốm nung · Tro tự nhiên", en: "Fired ceramic · Natural ash" },
      price: 420000, compareAt: null, rating: 4.8, reviewCount: 31, badge: null,
      images: ["assets/images/ceramic-burner.jpg", "assets/images/burner-urn.jpg", "assets/images/burner-ceramic.jpg"],
      short: {
        vi: "Khay gốm và tro núi tạo nền đốt sạch, giữ tro gọn và tôn lên dáng nhang.",
        en: "A ceramic tray and mountain ash create a clean base, containing ash and framing the incense."
      },
      description: {
        vi: "Bộ khay đốt trầm gồm khay gốm nung và tro núi tự nhiên, giúp giữ vệ sinh và tạo thẩm mỹ cho nghi lễ.",
        en: "A fired ceramic tray with natural mountain ash keeps the ritual clean and composed."
      },
      story: {
        vi: ["Tro núi được sàng mịn, không mùi, giữ được chân nhang và tàn tro. Khay gốm có thành cao vừa phải để tro không tràn ra ngoài.", "Phù hợp với nhang cây, nụ trầm hoặc nhang vòng mini."],
        en: ["The ash is finely sieved and odourless, holding sticks upright and catching the fall. The tray has a low wall to keep ash contained.", "Suits sticks, cones and mini coils."]
      },
      usage: {
        vi: ["Đổ tro vào khay, dàn đều.", "Cắm nhang hoặc đặt nụ trầm trực tiếp.", "Sàng bỏ tàn sau vài lần sử dụng."],
        en: ["Pour ash into the tray and level it.", "Insert a stick or place a cone directly.", "Sift out spent ash after several uses."]
      },
      specs: {
        origin: { vi: "Chế tác thủ công", en: "Handcrafted" },
        age: { vi: "Gốm nung", en: "Fired ceramic" },
        scent: { vi: "Không mùi", en: "Odourless" },
        weight: { vi: "Khay 18 × 12cm · 250g tro", en: "18 × 12cm tray · 250g ash" }
      },
      options: [
        { id: "tray", label: { vi: "Khay + tro", en: "Tray + ash" }, price: 420000, stock: 22 },
        { id: "duo", label: { vi: "Set 2 khay", en: "Set of 2 trays" }, price: 760000, stock: 10 }
      ]
    }),
    P({
      id: "acc-03", sku: "AB-PK03", slug: "bo-tra-tram-duong-tam", cat: "accessories", sub: "bo-tra",
      name: { vi: "Bộ Trà Trầm Dưỡng Tâm", en: "Duong Tam Tea Set" },
      subtitle: { vi: "Ấm tử sa · 6 chén", en: "Zisha pot · 6 cups" },
      price: 890000, compareAt: 1050000, rating: 4.9, reviewCount: 22, badge: "new",
      images: ["assets/images/tea-cup.jpg", "assets/images/ceramic-vase.jpg", "assets/images/tea-amber.jpg"],
      short: {
        vi: "Bộ trà tử sa mộc mạc, hoàn thiện nghi lễ thưởng trà và trầm trong cùng một không gian.",
        en: "An earthy zisha tea set to complete the ritual of tea and agarwood in one space."
      },
      description: {
        vi: "Bộ trà Dưỡng Tâm gồm ấm tử sa, 6 chén và khay trà, thiết kế tối giản, ấm tay và dễ dùng.",
        en: "The Duong Tam set includes a zisha pot, six cups and a tray — minimal, warm to hold and easy to use."
      },
      story: {
        vi: ["Bộ trà được chọn để đồng hành cùng trà trầm Abodhi. Chất liệu tử sa giữ nhiệt tốt, giúp trà thơm và êm hơn.", "Thiết kế không cầu kỳ, phù hợp cả nghi lễ trà đạo và những buổi trà thường ngày."],
        en: ["The set is designed to accompany Abodhi agarwood tea. Zisha clay holds heat well, making the tea rounder and more aromatic.", "Its uncomplicated design suits both formal tea ceremony and everyday brewing."]
      },
      usage: {
        vi: ["Tráng ấm chén bằng nước nóng trước khi pha.", "Dùng 5–7g trà cho 150ml nước.", "Vệ sinh bằng nước ấm, tránh chất tẩy mạnh."],
        en: ["Rinse the pot and cups with hot water before brewing.", "Use 5–7g of tea per 150ml.", "Clean with warm water; avoid harsh detergents."]
      },
      specs: {
        origin: { vi: "Chế tác thủ công", en: "Handcrafted" },
        age: { vi: "Tử sa nung", en: "Fired zisha" },
        scent: { vi: "Trung tính", en: "Neutral" },
        weight: { vi: "Ấm 220ml · 6 chén 45ml", en: "220ml pot · six 45ml cups" }
      },
      options: [
        { id: "set", label: { vi: "Bộ tiêu chuẩn", en: "Standard set" }, price: 890000, compareAt: 1050000, stock: 12 },
        { id: "gift", label: { vi: "Set quà tặng + trà 50g", en: "Gift set + 50g tea" }, price: 1180000, stock: 6 }
      ]
    })
  ];

  const ARTICLES = [
    {
      id: "art-news-1", slug: "nghe-thuat-thuong-tram", cat: "knowledge", featured: true,
      title: { vi: "Nghệ Thuật Thưởng Trầm Trong Không Gian Thiền Định & Trà Đạo", en: "The Art of Agarwood in Meditation & Tea" },
      excerpt: {
        vi: "Không chỉ là mùi hương, trầm hương còn là một nghi thức chậm lại: chọn nụ, châm lửa, quan sát khói và trở về với hơi thở.",
        en: "More than fragrance, agarwood is a ritual of slowing down: choose a cone, light it, watch the smoke and return to the breath."
      },
      image: "assets/images/smoke-square.jpg",
      date: "2026-11-08", read: 7, author: "Abodhi Journal",
      tags: ["thiền", "trà đạo", "nghi thức"],
      body: {
        vi: [
          { type: "p", text: "Trong văn hóa Á Đông, trầm hương không chỉ được dùng để làm thơm không gian. Nó là một phần của nghi lễ: mở đầu buổi trà, thanh tẩy bàn thờ, tĩnh tâm trước khi thiền hoặc đơn giản là đánh dấu khoảng chuyển giữa ngày dài và buổi tối." },
          { type: "h2", text: "Chọn đúng loại trầm cho từng khoảnh khắc" },
          { type: "p", text: "Nụ trầm nhỏ phù hợp phòng trà ấm cúng. Nhang không tăm dành cho không gian kín, nơi mùi gỗ cháy của lõi tre có thể làm nhiễu hương. Khoanh vân mây cháy lâu, hợp với những buổi thiền dài hoặc lớp yoga. Điều quan trọng nhất là chọn loại có cường độ phù hợp với diện tích và mục đích." },
          { type: "quote", text: "Một làn khói đủ mảnh để không lấn át hơi thở — đó là liều lượng của sự tĩnh tại." },
          { type: "p", text: "Hãy bắt đầu với một lượng nhỏ. Đặt nụ trầm ở khoảng cách vừa phải, mở cửa nhẹ để không khí lưu thông, và dành vài phút chỉ để quan sát. Khi hương đã quen, bạn có thể tăng dần theo nhu cầu." },
          { type: "h2", text: "Nghi thức ba phút" },
          { type: "list", items: ["Chọn một loại trầm bạn yêu thích và đặt lên khay chịu nhiệt.", "Châm lửa, thổi tắt và ngồi xuống trong im lặng.", "Theo dõi ba hơi thở dài trước khi bắt đầu công việc tiếp theo."] },
          { type: "p", text: "Điều đẹp nhất ở trầm hương là nó không vội. Hương đến chậm, tan chậm và ở lại trong ký ức lâu hơn nhiều so với một mùi hương tổng hợp." }
        ],
        en: [
          { type: "p", text: "In East Asian culture, agarwood is not only a room fragrance. It is part of a ritual: opening a tea session, cleansing an altar, settling the mind before meditation, or simply marking the shift between a long day and the evening." },
          { type: "h2", text: "Match the incense to the moment" },
          { type: "p", text: "Small cones suit an intimate tea room. Coreless incense is best for enclosed spaces where a bamboo core could intrude. Cloud coils burn slowly, ideal for longer meditation or yoga. The most important thing is to match intensity to the space and the intention." },
          { type: "quote", text: "A thread of smoke subtle enough not to overpower the breath — that is the dosage of stillness." },
          { type: "p", text: "Begin with a small amount. Place the cone at a comfortable distance, open a window slightly for air circulation, and spend a few minutes simply observing. As you become familiar with the scent, you can adjust gradually." },
          { type: "h2", text: "A three-minute ritual" },
          { type: "list", items: ["Choose an agarwood incense you love and place it on a heatproof tray.", "Light it, blow out the flame and sit down in silence.", "Follow three long breaths before returning to the next task."] },
          { type: "p", text: "The beauty of agarwood is that it never hurries. The scent arrives slowly, fades slowly and stays in memory far longer than a synthetic fragrance." }
        ]
      }
    },
    {
      id: "art-news-2", slug: "chon-kich-thuoc-vong-tram", cat: "knowledge", featured: false,
      title: { vi: "Cách Chọn Kích Thước Hạt Vòng Trầm Chuẩn Cổ Tay & Phong Thủy", en: "Choosing the Right Agarwood Bracelet Size" },
      excerpt: {
        vi: "6li, 8li, 10li hay 108 hạt? Một hướng dẫn thực tế để chọn vòng trầm vừa vặn, đẹp và phù hợp với năng lượng cá nhân.",
        en: "6mm, 8mm, 10mm or 108 beads? A practical guide to a comfortable, beautiful agarwood bracelet that suits your energy."
      },
      image: "assets/images/beads-bracelet.jpg",
      date: "2026-11-02", read: 6, author: "Abodhi Journal",
      tags: ["trang sức", "phong thủy", "kích thước"],
      body: {
        vi: [
          { type: "p", text: "Kích thước hạt ảnh hưởng trực tiếp đến cảm giác khi đeo và lượng nhựa trầm bạn tiếp xúc. Không có size nào là \"tốt nhất\" — chỉ có size phù hợp với cổ tay, phong cách và mục đích sử dụng." },
          { type: "h2", text: "6li và 8li: thanh mảnh, nữ tính" },
          { type: "p", text: "Vòng 6li phù hợp cổ tay 13–15cm, tạo cảm giác nhẹ và tinh tế. 8li đầm hơn, phù hợp cổ tay 15–17cm và người thích sự hiện diện rõ ràng hơn. Đây là hai kích thước dễ dùng hằng ngày." },
          { type: "h2", text: "10li, 12li và 14li: đĩnh đạc, nam tính" },
          { type: "p", text: "Từ 10li trở lên, vòng trầm mang phong thái mạnh mẽ và giữ được nhiều nhựa hơn. 10li hợp cổ tay 16–18cm; 12li và 14li dành cho cổ tay lớn hơn hoặc người thích phong cách statement." },
          { type: "h2", text: "21, 54 hay 108 hạt?" },
          { type: "p", text: "21 hạt là chiếc vòng đeo hằng ngày. 54 hạt quấn hai vòng hoặc đeo như chuỗi ngắn. 108 hạt là chuỗi trì chú truyền thống, thường quấn ba đến bốn vòng cổ tay. Nếu bạn mới bắt đầu, 21 hạt là lựa chọn dễ chịu nhất." },
          { type: "quote", text: "Chọn chiếc vòng bạn muốn chạm vào mỗi ngày — đó là tiêu chuẩn bền vững nhất." }
        ],
        en: [
          { type: "p", text: "Bead size affects both how a bracelet feels and how much agarwood resin sits against your skin. There is no \"best\" size — only the size that suits your wrist, style and intention." },
          { type: "h2", text: "6mm and 8mm: delicate and feminine" },
          { type: "p", text: "A 6mm bracelet suits a 13–15cm wrist and feels light and refined. 8mm is more present, suiting 15–17cm wrists and those who prefer a stronger silhouette. Both are easy for daily wear." },
          { type: "h2", text: "10mm, 12mm and 14mm: grounded and bold" },
          { type: "p", text: "From 10mm upward, agarwood bracelets carry a stronger presence and hold more resin. 10mm suits 16–18cm wrists; 12mm and 14mm are for larger wrists or a statement style." },
          { type: "h2", text: "21, 54 or 108 beads?" },
          { type: "p", text: "21 beads make an everyday bracelet. 54 beads wrap twice or wear as a short mala. 108 beads form a traditional mala, usually wrapping three to four times around the wrist. If you are new, 21 beads is the easiest place to begin." },
          { type: "quote", text: "Choose the bracelet you want to touch every day — that is the most durable standard." }
        ]
      }
    },
    {
      id: "art-news-3", slug: "hanh-trinh-cay-do-bau", cat: "knowledge", featured: false,
      title: { vi: "Hành Trình Cây Dó Bầu Tích Trầm Qua Thập Kỷ Giữa Đại Ngàn", en: "How Agarwood Forms Over Decades in the Forest" },
      excerpt: {
        vi: "Một cây dó bầu phải trải qua tổn thương, thời gian và những phản ứng sinh học kỳ diệu để tạo nên trầm hương.",
        en: "An aquilaria tree must endure injury, time and remarkable biology before it can create agarwood."
      },
      image: "assets/images/agarwood-log.jpg",
      date: "2026-10-26", read: 8, author: "Abodhi Journal",
      tags: ["nguồn gốc", "rừng", "trầm tự nhiên"],
      body: {
        vi: [
          { type: "p", text: "Trầm hương không phải là gỗ của cây dó bầu theo nghĩa thông thường. Nó hình thành khi cây bị tổn thương — do gió, sâu bệnh, nấm hoặc con người — và tiết ra nhựa để tự chữa lành. Theo năm tháng, nhựa ấy tích tụ, hóa thạch và trở thành phần gỗ thơm quý giá." },
          { type: "h2", text: "Thời gian là nguyên liệu quan trọng nhất" },
          { type: "p", text: "Một cây dó bầu có thể cần hàng chục năm để tạo ra trầm đủ dày. Không có công thức tăng tốc nào có thể thay thế hoàn toàn thời gian. Vì vậy, trầm hương tự nhiên luôn khan hiếm và có giá trị cao." },
          { type: "p", text: "Tại Abodhi, chúng tôi ưu tiên nguồn trầm có chứng nhận, khai thác có kiểm soát và trồng bổ sung. Mỗi sản phẩm đều được ghi rõ vùng nguyên liệu, độ tuổi tích trầm và hương vị đặc trưng." },
          { type: "quote", text: "Chúng ta không thể vội vàng với một thứ được sinh ra bởi thời gian." },
          { type: "h2", text: "Vì sao hương trầm khác nhau?" },
          { type: "p", text: "Vùng đất, loài cây, mức độ tổn thương và thời gian tích nhựa tạo nên sự khác biệt về sắc thái hương. Trầm Quảng Nam thường ngọt ấm, trầm Khánh Hòa sâu và có hậu vị cay nhẹ. Người sành trầm tìm kiếm chính những khác biệt ấy." }
        ],
        en: [
          { type: "p", text: "Agarwood is not simply the wood of an aquilaria tree. It forms when the tree is injured — by wind, insects, fungi or people — and releases resin to heal itself. Over decades, that resin accumulates and transforms into the precious aromatic heartwood." },
          { type: "h2", text: "Time is the most important ingredient" },
          { type: "p", text: "An aquilaria tree may need decades to produce agarwood thick enough to use. No accelerated process can fully replace time. This is why natural agarwood is always rare and valuable." },
          { type: "p", text: "At Abodhi, we prioritise certified, responsibly harvested and replanted sources. Every product records its growing region, resin age and distinctive scent profile." },
          { type: "quote", text: "We cannot hurry something that is born of time." },
          { type: "h2", text: "Why does agarwood smell different?" },
          { type: "p", text: "Soil, species, the degree of injury and the years of resin accumulation all shape the scent. Quang Nam agarwood tends to be sweet and warm; Khanh Hoa wood is deeper with a faint spice. Connoisseurs seek precisely these differences." }
        ]
      }
    },
    {
      id: "art-news-4", slug: "tram-huong-phong-thuy", cat: "fengshui", featured: false,
      title: { vi: "Trầm Hương Trong Phong Thủy: Chọn Mùi Hương Cho Không Gian Sống", en: "Agarwood in Feng Shui: Choosing Scent for Your Home" },
      excerpt: {
        vi: "Mùi hương có thể thay đổi cảm giác về một căn phòng. Trầm hương, với tính ấm và tĩnh, là một công cụ tinh tế để cân bằng không gian.",
        en: "Scent can change the feeling of a room. Warm, still agarwood is a subtle tool for balancing a space."
      },
      image: "assets/images/burner-sculpture.jpg",
      date: "2026-10-18", read: 5, author: "Abodhi Journal",
      tags: ["phong thủy", "không gian", "cân bằng"],
      body: {
        vi: [
          { type: "p", text: "Trong phong thủy, mùi hương không được xem là yếu tố trang trí mà là một phần của khí. Một không gian có mùi hương dễ chịu thường tạo cảm giác an tâm, dễ tập trung và dễ kết nối hơn." },
          { type: "h2", text: "Khu vực nào nên dùng trầm?" },
          { type: "p", text: "Phòng khách và phòng trà là nơi phù hợp nhất với trầm hương ấm. Phòng ngủ nên dùng nước cất hoặc nụ trầm nhỏ, tránh hương quá đậm. Không gian làm việc có thể dùng nhang không tăm để giữ sự tỉnh táo mà không gây nặng đầu." },
          { type: "p", text: "Hãy thử đặt lư xông ở góc phòng, tránh luồng gió mạnh và tránh đặt gần khu vực ăn uống. Một lượng nhỏ, đều đặn mỗi ngày thường hiệu quả hơn một lần đốt thật nhiều." },
          { type: "quote", text: "Mùi hương tốt là mùi hương khiến ta muốn hít thở chậm hơn." }
        ],
        en: [
          { type: "p", text: "In feng shui, scent is not decoration but part of the qi. A space that smells pleasant tends to feel safer, easier to focus in and easier to connect with." },
          { type: "h2", text: "Where should agarwood be used?" },
          { type: "p", text: "Living rooms and tea rooms suit warm agarwood best. In bedrooms, choose distilled water or a small cone rather than a heavy scent. For work spaces, coreless incense supports alertness without feeling dense." },
          { type: "p", text: "Place a burner in a corner, away from strong draughts and food areas. A small, regular amount each day is usually more effective than a single intense burn." },
          { type: "quote", text: "A good scent is one that makes us want to breathe more slowly." }
        ]
      }
    },
    {
      id: "art-news-5", slug: "thi-dinh-cung-huong-tram", cat: "fengshui", featured: false,
      title: { vi: "Thiền Định Cùng Hương Trầm: Một Cách Neo Mình Vào Hiện Tại", en: "Meditating with Agarwood: An Anchor to the Present" },
      excerpt: {
        vi: "Hương trầm có thể trở thành một neo cảm giác giúp người mới bắt đầu thiền dễ dàng trở về với hơi thở.",
        en: "Agarwood can become a sensory anchor that helps beginning meditators return to the breath."
      },
      image: "assets/images/meditation-monk.jpg",
      date: "2026-10-09", read: 5, author: "Abodhi Journal",
      tags: ["thiền", "chánh niệm", "thư giãn"],
      body: {
        vi: [
          { type: "p", text: "Với người mới thiền, việc ngồi yên trong im lặng có thể khó. Một mùi hương nhẹ giúp tạo ra một \"mốc\" cảm giác: khi tâm trí đi lang thang, ta có thể quay về với hương thơm trước khi quay về với hơi thở." },
          { type: "h2", text: "Chọn hương nhẹ, không gắt" },
          { type: "p", text: "Trầm hương tự nhiên có nhịp lan tỏa chậm, phù hợp với thiền. Tránh các loại nhang có hương liệu tổng hợp hoặc nồng độ quá cao, vì chúng có thể gây khó chịu trong không gian kín." },
          { type: "p", text: "Hãy đốt trầm trước khi ngồi vài phút để hương ổn định. Sau đó, chỉ cần chú ý đến cảm giác của hơi thở, âm thanh xung quanh và mùi gỗ ấm trong không khí." },
          { type: "quote", text: "Không cần xua tan suy nghĩ. Chỉ cần để chúng đi qua, như khói qua cửa sổ." }
        ],
        en: [
          { type: "p", text: "For beginning meditators, sitting in silence can be difficult. A light scent creates a sensory marker: when the mind wanders, we can return to the fragrance before returning to the breath." },
          { type: "h2", text: "Choose something light, never sharp" },
          { type: "p", text: "Natural agarwood unfolds slowly, making it a good companion for meditation. Avoid synthetic or very intense incense, which can feel oppressive in an enclosed room." },
          { type: "p", text: "Light the incense a few minutes before sitting so the scent can settle. Then simply notice the breath, the sounds around you and the warm wood in the air." },
          { type: "quote", text: "You do not need to banish thoughts. Let them pass, like smoke through a window." }
        ]
      }
    },
    {
      id: "art-news-6", slug: "bao-quan-vong-tram", cat: "knowledge", featured: false,
      title: { vi: "Bảo Quản Vòng Trầm Đúng Cách Để Hương Thơm Bền Lâu", en: "Caring for Your Agarwood Bracelet" },
      excerpt: {
        vi: "Trầm hương là vật liệu sống. Chỉ cần vài thói quen nhỏ, chiếc vòng của bạn có thể giữ hương và lên bóng đẹp theo thời gian.",
        en: "Agarwood is a living material. A few small habits will help your bracelet keep its scent and develop a beautiful patina."
      },
      image: "assets/images/beads-hand.jpg",
      date: "2026-09-30", read: 4, author: "Abodhi Journal",
      tags: ["bảo quản", "trang sức", "chăm sóc"],
      body: {
        vi: [
          { type: "p", text: "Trầm hương không thích nước, hóa chất và nhiệt độ cao. Những yếu tố này có thể làm mất lớp dầu tự nhiên trên bề mặt hạt và làm mờ hương thơm." },
          { type: "h2", text: "Những điều nên tránh" },
          { type: "list", items: ["Không ngâm vòng trong nước hoặc rửa bằng xà phòng mạnh.", "Không xịt nước hoa trực tiếp lên vòng.", "Không để vòng trong xe nóng hoặc gần nguồn nhiệt."] },
          { type: "h2", text: "Cách làm sạch và bảo quản" },
          { type: "p", text: "Lau vòng bằng vải mềm hơi ẩm, sau đó để khô tự nhiên trong bóng râm. Khi không đeo, cất trong hộp kín hoặc túi vải. Thi thoảng, bạn có thể để vòng gần lư trầm để hương gỗ được đánh thức." },
          { type: "quote", text: "Mỗi vết xước nhỏ là một dấu vết của thời gian — không cần che giấu, chỉ cần chăm sóc." }
        ],
        en: [
          { type: "p", text: "Agarwood dislikes water, chemicals and high heat. These can strip the natural oil from the bead surface and mute the fragrance." },
          { type: "h2", text: "What to avoid" },
          { type: "list", items: ["Do not soak the bracelet or wash it with harsh soap.", "Do not spray perfume directly onto the beads.", "Do not leave it in a hot car or near a heat source."] },
          { type: "h2", text: "Cleaning and storing" },
          { type: "p", text: "Wipe with a barely damp soft cloth, then air-dry in the shade. When not wearing it, store it in a sealed box or cloth pouch. Occasionally rest it near an incense burner to awaken the wood." },
          { type: "quote", text: "Every small scratch is a trace of time — no need to hide it, only to care for it." }
        ]
      }
    },
    {
      id: "art-news-7", slug: "abodhi-ra-mat-bo-suu-tap-thu-dong", cat: "news", featured: false,
      title: { vi: "Abodhi Ra Mắt Bộ Sưu Tập Thu Đông 2026: Đất, Khói & Ánh Sáng", en: "Abodhi Launches Autumn Winter 2026: Earth, Smoke & Light" },
      excerpt: {
        vi: "Bộ sưu tập mới tôn vinh vẻ đẹp của trầm hương tự nhiên qua ba sắc thái: đất, khói và ánh sáng.",
        en: "The new collection celebrates natural agarwood through three moods: earth, smoke and light."
      },
      image: "assets/images/temple-altar.jpg",
      date: "2026-09-22", read: 4, author: "Abodhi Studio",
      tags: ["tin tức", "bộ sưu tập", "abodhi"],
      body: {
        vi: [
          { type: "p", text: "Abodhi vừa giới thiệu bộ sưu tập Thu Đông 2026 với ba nhóm sản phẩm chính: Đất, Khói và Ánh Sáng. Bộ sưu tập tập trung vào các sản phẩm trầm hương tự nhiên có nguồn gốc rõ ràng và thiết kế tối giản." },
          { type: "h2", text: "Ba sắc thái, một tinh thần" },
          { type: "p", text: "Đất gồm phôi trầm, mỹ nghệ và phụ kiện gốm. Khói gồm nụ, nhang không tăm và khoanh vân mây. Ánh Sáng gồm trang sức, tinh dầu và nến thơm. Mỗi nhóm đều xoay quanh tinh thần \"An yên - Từ tâm\"." },
          { type: "p", text: "Bộ sưu tập có sẵn tại showroom 250 Huỳnh Minh Mương, Ấp 4, Xã Bình Mỹ, TP. Hồ Chí Minh và trên abodhi.com." },
          { type: "quote", text: "Chúng tôi muốn mỗi sản phẩm là một lời nhắc nhẹ nhàng: trở về, hít thở, và ở lại với hiện tại." }
        ],
        en: [
          { type: "p", text: "Abodhi has introduced its Autumn Winter 2026 collection in three groups: Earth, Smoke and Light. The collection focuses on traceable natural agarwood and minimal design." },
          { type: "h2", text: "Three moods, one spirit" },
          { type: "p", text: "Earth includes raw agarwood, art and ceramic accessories. Smoke includes cones, coreless incense and cloud coils. Light includes jewellery, essential oils and scented candles. Every group returns to the idea of serenity from the heart." },
          { type: "p", text: "The collection is available at 250 Huynh Minh Muong, Binh My, Ho Chi Minh City and on abodhi.com." },
          { type: "quote", text: "We want every product to be a gentle reminder: return, breathe, and stay with the present." }
        ]
      }
    },
    {
      id: "art-news-8", slug: "cach-dot-nu-tram-dung", cat: "knowledge", featured: false,
      title: { vi: "Cách Đốt Nụ Trầm Đúng: Ít Khói Hơn, Thơm Lâu Hơn", en: "How to Burn Agarwood Cones Properly" },
      excerpt: {
        vi: "Chỉ một vài điều chỉnh nhỏ trong cách châm và đặt nụ trầm có thể giúp hương thơm sạch hơn và lưu lâu hơn.",
        en: "A few small adjustments to lighting and placement can make your agarwood cones cleaner and longer-lasting."
      },
      image: "assets/images/burner-ceramic.jpg",
      date: "2026-09-15", read: 4, author: "Abodhi Journal",
      tags: ["hướng dẫn", "nụ trầm", "nghi thức"],
      body: {
        vi: [
          { type: "p", text: "Nụ trầm thường bị cháy quá nhanh hoặc sinh nhiều khói khi ngọn lửa chưa được thổi tắt đúng cách, hoặc khi đặt trong không gian quá kín." },
          { type: "h2", text: "Ba bước chuẩn" },
          { type: "list", items: ["Đặt nụ trên khay chịu nhiệt, không dùng đĩa nhựa.", "Châm lửa ở đỉnh nụ đến khi phần đầu cháy đỏ đều.", "Thổi tắt ngọn lửa và để nụ tự cháy trong không gian thoáng nhẹ."] },
          { type: "p", text: "Nếu thấy khói quá nhiều, hãy kiểm tra độ thông thoáng của phòng và giảm số lượng nụ. Chất lượng bột trầm cũng ảnh hưởng lớn: trầm nguyên chất thường cho khói mảnh và tàn tro xám nhẹ." },
          { type: "quote", text: "Đốt ít, quan sát nhiều — đó là cách thưởng trầm." }
        ],
        en: [
          { type: "p", text: "Agarwood cones often burn too quickly or produce excess smoke when the flame is not blown out properly, or when placed in a space that is too enclosed." },
          { type: "h2", text: "The simple three-step method" },
          { type: "list", items: ["Place the cone on a heatproof tray, never a plastic dish.", "Light the tip until the top glows evenly.", "Blow out the flame and let the cone smoulder in gently moving air."] },
          { type: "p", text: "If there is too much smoke, check the room's ventilation and reduce the number of cones. The quality of the powder matters too: pure agarwood tends to produce fine smoke and soft grey ash." },
          { type: "quote", text: "Burn less, observe more — that is how agarwood is enjoyed." }
        ]
      }
    },
    {
      id: "art-news-9", slug: "tra-tram-nghi-thuc-buoi-sang", cat: "knowledge", featured: false,
      title: { vi: "Trà Trầm & Nghi Thức Buổi Sáng Chậm Rãi", en: "Agarwood Tea & a Slow Morning Ritual" },
      excerpt: {
        vi: "Một tách trà trầm, một làn khói mỏng và mười lăm phút không màn hình — nghi thức nhỏ để bắt đầu ngày mới.",
        en: "A cup of agarwood tea, a thread of smoke and fifteen screen-free minutes — a small ritual to begin the day."
      },
      image: "assets/images/tea-amber.jpg",
      date: "2026-09-08", read: 3, author: "Abodhi Journal",
      tags: ["trà", "nghi thức", "buổi sáng"],
      body: {
        vi: [
          { type: "p", text: "Buổi sáng thường là lúc tâm trí dễ bị cuốn vào điện thoại và danh sách việc cần làm. Một nghi thức trà đơn giản có thể tạo ra khoảng đệm nhỏ trước khi ngày bắt đầu." },
          { type: "h2", text: "Công thức tối giản" },
          { type: "p", text: "Hãm 3g trà trầm với 150ml nước 85°C trong hai phút. Trong lúc chờ, đốt một nụ trầm nhỏ. Ngồi xuống, uống ngụm đầu tiên và chỉ chú ý đến vị trà và mùi gỗ." },
          { type: "p", text: "Không cần cầu kỳ. Điều quan trọng là sự hiện diện: mười lăm phút không màn hình, không thông báo, chỉ có trà và hơi thở." },
          { type: "quote", text: "Một ngày bắt đầu chậm rãi thường là một ngày được sống trọn vẹn hơn." }
        ],
        en: [
          { type: "p", text: "Mornings are when the mind is most easily pulled into phones and to-do lists. A simple tea ritual can create a small buffer before the day begins." },
          { type: "h2", text: "A minimal recipe" },
          { type: "p", text: "Steep 3g of agarwood tea in 150ml of 85°C water for two minutes. While it steeps, light a small agarwood cone. Sit, take the first sip and notice only the tea and the wood." },
          { type: "p", text: "Nothing elaborate is required. What matters is presence: fifteen screen-free minutes, no notifications, just tea and breath." },
          { type: "quote", text: "A day that begins slowly is often a day lived more fully." }
        ]
      }
    }
  ];

  const TESTIMONIALS = [
    { id: "t1", name: "Nguyễn Thu Hà", location: { vi: "Hà Nội", en: "Hanoi" }, rating: 5, product: "Nụ Trầm Hương Thượng Hạng", quote: { vi: "Mùi trầm rất sạch, không gắt. Mình đốt buổi tối trong phòng trà, khói mỏng và hương ngọt nhẹ rất dễ chịu. Đóng gói tỉ mỉ, có thiệp viết tay.", en: "The incense is beautifully clean, never harsh. I burn it in the evening tea room; the smoke is thin and the scent gently sweet. The packaging is thoughtful, with a handwritten note." }, initial: "H" },
    { id: "t2", name: "Trần Quốc Bảo", location: { vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" }, rating: 5, product: "Vòng Tay Trầm 10li – 12li", quote: { vi: "Vòng lên tay rất đẹp, hạt đều và thơm tự nhiên. Mình chọn 12li 21 hạt, đeo làm việc cả ngày vẫn thấy nhẹ. Nhân viên tư vấn size rất kỹ.", en: "The bracelet looks beautiful on the wrist, with even beads and a natural scent. I chose 12mm / 21 beads and it stays comfortable all day. The team advised carefully on sizing." }, initial: "B" },
    { id: "t3", name: "Lê Minh Anh", location: { vi: "Đà Nẵng", en: "Da Nang" }, rating: 5, product: "Trà Trầm Sấy Thăng Hoa", quote: { vi: "Trà thơm nhẹ, hậu ngọt. Mình pha cùng một nụ trầm vào sáng chủ nhật, thành một nghi thức nhỏ rất yên. Sẽ mua thêm hộp 100g.", en: "The tea is lightly fragrant with a sweet finish. I brew it with a cone on Sunday mornings — a small, peaceful ritual. I will order the 100g box next." }, initial: "A" },
    { id: "t4", name: "Phạm Gia Hân", location: { vi: "Cần Thơ", en: "Can Tho" }, rating: 5, product: "Tinh Dầu Trầm Hương", quote: { vi: "Tinh dầu thơm ấm và rất lâu. Mình dùng 3 giọt trong máy khuếch tán, cả phòng như được bao bọc bởi gỗ trầm. Chai thủy tinh tối rất chắc chắn.", en: "The oil is warm and lasts for hours. Three drops in the diffuser wrap the whole room in agarwood. The amber glass bottle feels very substantial." }, initial: "H" },
    { id: "t5", name: "Võ Thành Nam", location: { vi: "Bình Dương", en: "Binh Duong" }, rating: 5, product: "Tượng Phật Quán Thế Âm", quote: { vi: "Tác phẩm đẹp hơn mong đợi. Nghệ nhân tư vấn rất tận tâm, gửi hình từng công đoạn. Đây là món quà ý nghĩa cho gia đình.", en: "The piece exceeded my expectations. The craftsman advised patiently and shared photos at each stage. A meaningful gift for my family." }, initial: "N" },
    { id: "t6", name: "Đỗ Khánh Linh", location: { vi: "Hải Phòng", en: "Hai Phong" }, rating: 5, product: "Xà Bông Gỗ Thơm", quote: { vi: "Xà bông dịu, không khô da, mùi gỗ ấm rất sang. Mình mua set 6 bánh để tặng bạn bè, ai cũng thích. Giao hàng nhanh, đóng gói đẹp.", en: "The soap is gentle, doesn't dry my skin, and the warm wood scent feels elegant. I bought the set of six for friends and everyone loved it. Fast delivery, beautiful packaging." }, initial: "L" }
  ];

  const FAQ = [
    { q: { vi: "Sản phẩm trầm hương của Abodhi có phải 100% tự nhiên không?", en: "Is Abodhi agarwood 100% natural?" }, a: { vi: "Các dòng nhang, nụ và bột trầm của Abodhi sử dụng bột trầm nguyên chất kết dính bằng vỏ cây bời lời tự nhiên, không hương liệu tổng hợp và không hóa chất cuốn tàn. Tinh dầu và nước cất được chưng cất từ nguyên liệu trầm tuyển chọn.", en: "Abodhi incense, cones and powders use pure agarwood powder bound with natural litsea bark — no synthetic fragrance and no ash-curling chemicals. Oils and distilled waters are made from selected agarwood." } },
    { q: { vi: "Tôi nên chọn size vòng tay nào?", en: "Which bracelet size should I choose?" }, a: { vi: "Vòng 6li phù hợp cổ tay 13–15cm, 8li cho 15–17cm, 10li cho 16–18cm, 12li cho 17–19cm và 14li cho 18–20cm. Nếu phân vân, hãy nhắn Zalo cho Abodhi để được tư vấn theo số đo cụ thể.", en: "6mm suits 13–15cm wrists, 8mm 15–17cm, 10mm 16–18cm, 12mm 17–19cm and 14mm 18–20cm. If unsure, message Abodhi on Zalo with your measurement." } },
    { q: { vi: "Phí vận chuyển và thời gian giao hàng?", en: "What are the shipping fee and delivery times?" }, a: { vi: "Abodhi áp dụng phí vận chuyển cố định 30.000₫ cho mọi đơn hàng toàn quốc. Đơn nội thành TP. Hồ Chí Minh thường nhận trong 1–2 ngày làm việc; các tỉnh thành khác 3–5 ngày làm việc.", en: "A fixed shipping fee of 30,000₫ applies to all orders nationwide. Ho Chi Minh City orders usually arrive in 1–2 working days; other provinces in 3–5 working days." } },
    { q: { vi: "Có thể thanh toán khi nhận hàng không?", en: "Can I pay on delivery?" }, a: { vi: "Có. Abodhi hỗ trợ COD (thanh toán khi nhận hàng) và chuyển khoản ngân hàng. Với chuyển khoản, quý khách vui lòng ghi mã đơn hàng trong nội dung chuyển khoản để được xác nhận nhanh.", en: "Yes. Abodhi supports COD and bank transfer. For bank transfer, please include your order ID in the transfer note so we can confirm quickly." } },
    { q: { vi: "Tôi có thể đặt chế tác mỹ nghệ theo yêu cầu không?", en: "Can I commission a bespoke agarwood artwork?" }, a: { vi: "Có. Quý khách có thể gửi yêu cầu qua form \"Đặt chế tác riêng\" với kích thước, chất liệu và câu chuyện mong muốn. Abodhi sẽ liên hệ trong 24 giờ làm việc để tư vấn và báo giá.", en: "Yes. Submit the bespoke form with your desired dimensions, material and story. Abodhi will contact you within 24 working hours to advise and quote." } },
    { q: { vi: "Chính sách đổi trả như thế nào?", en: "What is the return policy?" }, a: { vi: "Sản phẩm lỗi hoặc không đúng mô tả được đổi trả trong 7 ngày kể từ khi nhận hàng. Với sản phẩm đặt riêng và mỹ nghệ độc bản, chính sách đổi trả được thỏa thuận riêng trước khi chế tác.", en: "Faulty or misdescribed items can be returned within seven days of receipt. Bespoke and one-of-a-kind pieces are subject to a separate agreement before production." } }
  ];

  const PROCESS = [
    { no: "01", title: { vi: "Tuyển chọn phôi trầm", en: "Selecting the wood" }, text: { vi: "Mỗi phôi trầm được kiểm tra vân, mùi và hàm lượng dầu trước khi đưa vào chế tác.", en: "Every block is checked for grain, scent and oil content before it enters the workshop." }, icon: "i-leaf" },
    { no: "02", title: { vi: "Làm sạch thủ công", en: "Hand cleaning" }, text: { vi: "Loại bỏ phần gỗ không tích trầm bằng dụng cụ nhỏ, giữ lại mạch nhựa quý.", en: "Non-resinous wood is removed with small tools, preserving the precious resin veins." }, icon: "i-spark" },
    { no: "03", title: { vi: "Tạo hình & chế tác", en: "Shaping & carving" }, text: { vi: "Nghệ nhân nương theo thế gỗ để tạo hình sản phẩm, không ghép, không phủ màu.", en: "Craftsmen follow the wood's natural form — no joins, no colour coating." }, icon: "i-bowl" },
    { no: "04", title: { vi: "Đánh bóng tự nhiên", en: "Natural finishing" }, text: { vi: "Bề mặt được hoàn thiện bằng nhám mịn và vải mềm, giữ nguyên vân và hương.", en: "Surfaces are finished with fine abrasives and soft cloth, preserving grain and scent." }, icon: "i-bead" },
    { no: "05", title: { vi: "Kiểm định & đóng gói", en: "Inspection & packing" }, text: { vi: "Từng sản phẩm được kiểm tra lần cuối, ghi mã và đóng gói trong hộp bảo vệ.", en: "Each piece is finally inspected, coded and packed in a protective box." }, icon: "i-shield" }
  ];

  const PILLARS = [
    { icon: "i-leaf", title: { vi: "100% tự nhiên", en: "100% natural" }, text: { vi: "Không hương liệu tổng hợp, không hóa chất cuốn tàn. Chỉ trầm và nguyên liệu thực vật.", en: "No synthetic fragrance, no ash-curling chemicals. Only agarwood and plant ingredients." } },
    { icon: "i-pin", title: { vi: "Minh bạch nguồn gốc", en: "Traceable origin" }, text: { vi: "Mỗi sản phẩm ghi rõ vùng nguyên liệu và độ tuổi tích trầm.", en: "Every product states its growing region and resin age." } },
    { icon: "i-bowl", title: { vi: "Chế tác thủ công", en: "Handcrafted" }, text: { vi: "Nghệ nhân làm từng sản phẩm bằng tay, không sản xuất hàng loạt.", en: "Craftsmen make each piece by hand, never mass-produced." } },
    { icon: "i-heart", title: { vi: "Từ tâm", en: "From the heart" }, text: { vi: "Lợi nhuận một phần được dành cho bảo tồn rừng trầm và cộng đồng địa phương.", en: "A share of profits supports agarwood forest conservation and local communities." } }
  ];

  const STATS = [
    { value: "12+", label: { vi: "Năm đồng hành cùng trầm Việt", en: "Years with Vietnamese agarwood" } },
    { value: "3.200+", label: { vi: "Khách hàng tin chọn", en: "Customers who trust us" } },
    { value: "8", label: { vi: "Dòng sản phẩm tinh tuyển", en: "Curated product lines" } },
    { value: "100%", label: { vi: "Trầm tự nhiên, minh bạch", en: "Natural, traceable agarwood" } }
  ];

  const UI = {
    vi: {
      skip: "Bỏ qua điều hướng", mainNav: "Điều hướng chính", brandTagline: "Trầm hương tự nhiên · An yên · Từ tâm",
      announceShip: "Miễn phí tư vấn · Phí vận chuyển cố định 30.000₫ toàn quốc", announceNatural: "Trầm hương tự nhiên 100% · Minh bạch nguồn gốc",
      navHome: "Trang chủ", navAbout: "Giới thiệu", navShop: "Sản phẩm", navNews: "Kiến thức trầm", navContact: "Liên hệ",
      megaEyebrow: "Bộ sưu tập Abodhi", megaTitle: "Tinh hoa trầm hương Việt", megaDesc: "Từ nụ trầm thủ công đến trang sức chìm dầu — mỗi sản phẩm là một lời mời trở về với sự an yên.",
      viewAll: "Xem tất cả sản phẩm", search: "Tìm kiếm", trackOrder: "Theo dõi đơn hàng", trackOrderShort: "Theo dõi đơn", openCart: "Mở giỏ hàng", openMenu: "Mở menu", close: "Đóng",
      searchEyebrow: "Tìm trong Abodhi", searchPlaceholder: "Tìm nhang trầm, vòng tay, tinh dầu…", searchPopular: "Tìm kiếm phổ biến", searchEmpty: "Không tìm thấy sản phẩm phù hợp. Thử từ khoá khác nhé.", searchProducts: "Sản phẩm", searchArticles: "Bài viết", searchViewAll: "Xem tất cả kết quả",
      footerIntro: "Từ những cánh rừng trầm già tuổi tại Quảng Nam, Khánh Hòa và Gia Lai, Abodhi gìn giữ tinh hoa đất trời trong từng sản phẩm chế tác thủ công — để mỗi khoảnh khắc sống đều trở nên tĩnh tại và trọn vẹn.",
      footerCategories: "Danh mục sản phẩm", footerPolicies: "Chính sách khách hàng", policyShipping: "Chính sách vận chuyển", policyPayment: "Thanh toán COD & chuyển khoản", policyReturn: "Đổi trả & bảo hành", policyPrivacy: "Bảo mật thông tin", footerCraft: "Câu chuyện chế tác", footerContact: "Liên hệ Abodhi",
      hours: "08:00 – 21:00 · Thứ 2 – Chủ nhật", legalLabel: "Đơn vị chủ quản", legalNote: "Hình ảnh mang tính chất minh hoạ. Thông tin sản phẩm được cập nhật liên tục.",
      chatZalo: "Chat Zalo", callNow: "Gọi ngay · 0912 578 516", yourSelection: "Lựa chọn của bạn", cart: "Giỏ hàng",
      cartEmptyTitle: "Giỏ hàng đang trống", cartEmptyDesc: "Hãy chọn một món quà nhỏ từ Abodhi để bắt đầu nghi thức của bạn.", continueShopping: "Tiếp tục khám phá", viewCart: "Xem giỏ hàng", checkout: "Thanh toán", subtotal: "Tạm tính", shipping: "Vận chuyển", shippingFixed: "Phí cố định", total: "Tổng cộng", remove: "Xoá", quantity: "Số lượng", addToCart: "Thêm vào giỏ", addedToCart: "Đã thêm vào giỏ", buyNow: "Mua ngay", consult: "Liên hệ tư vấn", contactForPrice: "Liên hệ", quoteRequest: "Gửi yêu cầu báo giá", outOfStock: "Hết hàng", inStock: "Còn hàng", lowStock: "Chỉ còn {n} sản phẩm", bestseller: "Bán chạy", new: "Mới", sale: "Ưu đãi", limited: "Giới hạn", oneofakind: "Độc bản", bespoke: "Đặt riêng", quickView: "Xem nhanh",
      filters: "Bộ lọc", clearFilters: "Xoá bộ lọc", category: "Danh mục", allCategories: "Tất cả sản phẩm", priceRange: "Khoảng giá", keyword: "Từ khoá", apply: "Áp dụng", sortBy: "Sắp xếp", sortDefault: "Mặc định", sortPriceAsc: "Giá: thấp đến cao", sortPriceDesc: "Giá: cao đến thấp", sortNewest: "Mới nhất", sortBest: "Bán chạy nhất", showing: "Hiển thị", products: "sản phẩm", page: "Trang", prev: "Trước", next: "Sau", noProducts: "Không tìm thấy sản phẩm nào phù hợp với bộ lọc.", reset: "Đặt lại", readMore: "Đọc tiếp", readArticle: "Đọc bài viết", relatedProducts: "Có thể bạn cũng thích", description: "Mô tả sản phẩm", usage: "Hướng dẫn sử dụng", specifications: "Thông số", reviews: "Đánh giá", shippingPolicy: "Chính sách giao hàng", share: "Chia sẻ", backToNews: "Quay lại Kiến thức trầm", minuteRead: "{n} phút đọc", published: "Đăng ngày", categories: "Danh mục", tags: "Thẻ",
      orderTracking: "Theo dõi đơn hàng", orderTrackingDesc: "Nhập mã đơn hàng và số điện thoại để xem trạng thái mới nhất.", orderId: "Mã đơn hàng", phoneNumber: "Số điện thoại", track: "Tra cứu đơn", trackingEmpty: "Chưa có đơn hàng nào được tìm thấy. Vui lòng kiểm tra lại mã đơn và số điện thoại.", trackingResult: "Kết quả tra cứu", status: "Trạng thái", orderDate: "Ngày đặt", customer: "Khách hàng", paymentMethod: "Thanh toán", cod: "COD – Thanh toán khi nhận hàng", bank: "Chuyển khoản ngân hàng", orderConfirmed: "Đơn hàng đã được xác nhận", orderConfirmedDesc: "Cảm ơn bạn đã tin chọn Abodhi. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.", orderCode: "Mã đơn hàng của bạn", saveOrderCode: "Vui lòng lưu mã này để theo dõi đơn hàng.", backHome: "Về trang chủ",
      shoppingCart: "Giỏ hàng của bạn", cartTitle: "Giỏ hàng & Thanh toán", cartSubtitle: "Một vài món quà nhỏ, một nghi thức trọn vẹn.", checkoutTitle: "Thông tin thanh toán", checkoutSubtitle: "Abodhi giao hàng toàn quốc với phí vận chuyển cố định 30.000₫.", shippingInfo: "Thông tin giao hàng", fullName: "Họ và tên", email: "Email", address: "Địa chỉ nhận hàng", city: "Tỉnh / Thành phố", note: "Ghi chú cho Abodhi", orderSummary: "Tóm tắt đơn hàng", placeOrder: "Xác nhận đặt hàng", payment: "Phương thức thanh toán", paymentCod: "Thanh toán khi nhận hàng (COD)", paymentCodDesc: "Thanh toán bằng tiền mặt khi nhận hàng. An toàn, thuận tiện.", paymentBank: "Chuyển khoản ngân hàng", paymentBankDesc: "Chuyển khoản trước, Abodhi xác nhận và gửi hàng.", bankInfo: "Thông tin chuyển khoản", accountName: "Chủ tài khoản", accountNumber: "Số tài khoản", bankName: "Ngân hàng", copy: "Sao chép", copied: "Đã sao chép", orderSuccess: "Đặt hàng thành công", orderSuccessDesc: "Abodhi đã nhận đơn hàng của bạn và sẽ sớm liên hệ xác nhận.", continueShopping: "Tiếp tục mua sắm", viewOrder: "Theo dõi đơn hàng", emptyCartTitle: "Giỏ hàng trống", cartEmptyCheckout: "Bạn cần thêm sản phẩm vào giỏ trước khi thanh toán.", required: "Vui lòng nhập thông tin này.", invalidPhone: "Số điện thoại chưa hợp lệ.", invalidEmail: "Email chưa hợp lệ.", consentRequired: "Vui lòng đồng ý để Abodhi liên hệ.",
      contactTitle: "Liên hệ Abodhi", contactSubtitle: "Một câu hỏi, một yêu cầu đặt riêng hay chỉ là lời chào — chúng tôi luôn sẵn lòng lắng nghe.", contactFormTitle: "Gửi lời nhắn", subject: "Chủ đề", message: "Nội dung", send: "Gửi liên hệ", contactSuccess: "Đã gửi lời nhắn", contactSuccessDesc: "Cảm ơn bạn đã liên hệ. Abodhi sẽ phản hồi trong vòng 24 giờ làm việc.", hotline: "Hotline", emailLabel: "Email", addressLabel: "Showroom", hoursLabel: "Giờ mở cửa", showroom: "Showroom Abodhi", directions: "Chỉ đường", mapTitle: "Bản đồ showroom Abodhi", faqTitle: "Câu hỏi thường gặp",
      heroEyebrow: "Trầm hương tự nhiên · Từ Quảng Nam", heroTitle1: "Trầm hương", heroTitleAccent: "An yên", heroTitle2: "Từ tâm", heroSubtitle: "Tinh hoa đất trời tích tụ qua hàng chục năm, gói trọn trong từng thớ gỗ. Abodhi mang đến hương trầm thanh khiết, để mỗi khoảnh khắc sống đều trở nên tĩnh tại.", exploreCollection: "Khám phá bộ sưu tập", bespokeCta: "Đặt chế tác mỹ nghệ", heroNote: "Chế tác thủ công · Minh bạch nguồn gốc", heroCardTitle: "Trầm kiến 20 năm", heroCardText: "Tuyển chọn từ rừng già Khánh Hòa", heroScroll: "Cuộn để khám phá",
      trust1: "Trầm tự nhiên 100%", trust1s: "Không hương liệu tổng hợp", trust2: "Chế tác thủ công", trust2s: "Nghệ nhân lành nghề", trust3: "Minh bạch nguồn gốc", trust3s: "Quảng Nam · Khánh Hòa · Gia Lai", trust4: "Giao hàng toàn quốc", trust4s: "Phí cố định 30.000₫",
      catEyebrow: "Tám dòng sản phẩm", catTitle: "Một thế giới trầm hương", catSubtitle: "Từ làn khói nhẹ trong phòng trà đến vòng tay ấm áp nơi cổ tay — mỗi dòng sản phẩm là một cách trở về với chính mình.", explore: "Khám phá",
      bestEyebrow: "Được yêu chọn", bestTitle: "Sản phẩm bán chạy", bestSubtitle: "Những món quà được khách hàng Abodhi tin chọn nhiều nhất.", viewAllProducts: "Xem tất cả sản phẩm", scrollPrev: "Trước", scrollNext: "Sau",
      featuredEyebrow: "Bộ sưu tập tinh tuyển", featuredTitle: "Tinh hoa trầm cảnh & trang sức", featuredSubtitle: "Chạm vào từng thớ gỗ, cảm nhận thời gian đã nuôi dưỡng nên hương trầm.", tabIncense: "Nhang trầm", tabJewelry: "Trang sức phong thủy", tabOils: "Tinh dầu & Nước cất", tabArt: "Mỹ nghệ cao cấp",
      giftEyebrow: "Quà tặng & chăm sóc", giftTitle: "Một món quà nhỏ, một lời chăm sóc", giftSubtitle: "Trà trầm, xà bông thảo mộc và những vật phẩm dịu lành cho người bạn thương.", giftCta: "Xem quà tặng", storyEyebrow: "Câu chuyện Abodhi", storyTitle: "An yên không ở đâu xa. Nó bắt đầu từ một hơi thở chậm.", storyText1: "Abodhi được sinh ra từ tình yêu với trầm hương Việt và mong muốn gìn giữ những giá trị chậm rãi của nó. Chúng tôi tin rằng một sản phẩm tốt không chỉ thơm, mà còn phải minh bạch, bền vững và được làm bằng sự tôn trọng.", storyText2: "Mỗi phôi trầm được tuyển chọn kỹ lưỡng, mỗi sản phẩm được chế tác thủ công bởi nghệ nhân. Từ Quảng Nam, Khánh Hòa đến Gia Lai, chúng tôi đi tìm những thớ gỗ giàu nhựa nhất để gửi đến bạn.", storyCta: "Đọc câu chuyện của chúng tôi", storyQuote: "Trầm hương tự nhiên — An yên — Từ tâm", statYears: "Năm kinh nghiệm", statCustomers: "Khách hàng", statProducts: "Dòng sản phẩm", statNatural: "Tự nhiên",
      testiEyebrow: "Đánh giá khách hàng", testiTitle: "Những lời nhắn từ người đồng hành", testiSubtitle: "Mỗi đánh giá là một câu chuyện nhỏ được gửi gắm cùng hương trầm.", verified: "Đã mua tại Abodhi",
      newsEyebrow: "Tin tức & kiến thức", newsTitle: "Câu chuyện từ rừng trầm", newsSubtitle: "Hiểu thêm về trầm hương, phong thủy, thiền định và những giá trị bền vững.", viewAllNews: "Xem tất cả bài viết",
      newsletterTitle: "Nhận một lá thư an yên", newsletterSubtitle: "Đăng ký để nhận câu chuyện mới, ưu đãi nhỏ và những gợi ý nghi thức sống chậm từ Abodhi.", emailPh: "Email của bạn", subscribe: "Đăng ký", subscribed: "Cảm ơn bạn đã đăng ký!", privacyNote: "Abodhi tôn trọng quyền riêng tư của bạn. Không spam, chỉ là những lá thư thỉnh thoảng.",
      aboutEyebrow: "Về Abodhi", aboutTitle: "Chúng tôi đi tìm hương trầm của thời gian.", aboutLead: "Abodhi là nơi trầm hương Việt được gìn giữ bằng sự hiểu biết, đôi tay của nghệ nhân và một niềm tin rằng vẻ đẹp thật sự luôn cần thời gian.", aboutStoryEyebrow: "Khởi nguyên", aboutStoryTitle: "Từ một cánh rừng già đến một nghi thức nhỏ trong ngôi nhà bạn.", aboutStory1: "Chúng tôi bắt đầu bằng những chuyến đi vào Quảng Nam, Khánh Hòa và Gia Lai, nơi những cây dó bầu già tuổi tích trầm qua nhiều thập kỷ. Ở đó, chúng tôi học được rằng trầm hương không thể vội.", aboutStory2: "Abodhi ra đời để mang những phôi trầm tốt nhất về với đời sống hằng ngày — không phải như một món hàng xa xỉ, mà như một cách chăm sóc tâm trí và không gian sống.", aboutCommitEyebrow: "Cam kết", aboutCommitTitle: "Bốn trụ cột của Abodhi", processEyebrow: "Quy trình", processTitle: "Từ phôi trầm đến tác phẩm", processSubtitle: "Mỗi sản phẩm đi qua năm bước chế tác tỉ mỉ, nơi thời gian và đôi tay nghệ nhân cùng làm việc.", aboutQuote: "Chúng tôi không bán sự xa xỉ. Chúng tôi trao một khoảng lặng.", aboutCta: "Khám phá sản phẩm",
      shopEyebrow: "Bộ sưu tập", shopTitle: "Sản phẩm của Abodhi", shopSubtitle: "Tuyển chọn trầm hương tự nhiên cho không gian, cơ thể và tâm trí. Lọc theo nhu cầu của bạn.", priceAll: "Tất cả mức giá", priceUnder1: "Dưới 500K", price500to1: "500K – 1TR", price1to3: "1TR – 3TR", priceOver3: "Trên 3TR", showFilters: "Lọc sản phẩm", hideFilters: "Ẩn bộ lọc", activeFilters: "Đang lọc", clearAll: "Xoá tất cả", subCategory: "Dòng sản phẩm", resultFor: "Kết quả cho", sortLabel: "Sắp xếp theo",
      newsEyebrow2: "Tạp chí Abodhi", newsTitle2: "Kiến thức trầm hương", newsSubtitle2: "Những bài viết chậm rãi về trầm, thiền, phong thủy và nghệ thuật sống.", allArticles: "Tất cả", knowledgeCat: "Kiến thức trầm", fengshuiCat: "Phong thủy & Thiền định", companyCat: "Tin tức Abodhi", featuredArticle: "Bài viết nổi bật", latestArticles: "Bài viết mới", readTime: "phút đọc", articleBy: "Bởi", relatedArticles: "Bài viết liên quan",
      contactEyebrow: "Kết nối", contactTitle2: "Có một câu hỏi? Hãy để Abodhi lắng nghe.", contactLead: "Dù bạn muốn tư vấn sản phẩm, đặt một tác phẩm riêng hay chỉ muốn ghé thăm showroom, chúng tôi luôn ở đây.", formName: "Họ và tên", formNamePh: "Nguyễn Minh An", formPhone: "Số điện thoại", formPhonePh: "0912 345 678", formEmail: "Email", formEmailPh: "ban@email.com", formNote: "Ghi chú", formSubject: "Chủ đề", formMessage: "Nội dung", formMessagePh: "Bạn muốn nhắn gì với Abodhi?", formConsent: "Tôi đồng ý được Abodhi liên hệ để tư vấn.", formSend: "Gửi lời nhắn", formSending: "Đang gửi…", formSuccess: "Đã gửi lời nhắn", formSuccessDesc: "Cảm ơn bạn. Abodhi sẽ phản hồi trong vòng 24 giờ làm việc.",
      quoteEyebrow: "Đặt chế tác riêng", quoteTitle: "Gửi yêu cầu báo giá", quoteIntro: "Hãy chia sẻ với Abodhi điều bạn đang hình dung. Nghệ nhân của chúng tôi sẽ liên hệ để cùng bạn hoàn thiện tác phẩm.", quoteDimensions: "Kích thước / quy cách mong muốn", quoteDimensionsPh: "Ví dụ: tượng cao 25cm, ngang 12cm…", quoteMaterial: "Chất liệu / phong cách", quoteMat1: "Trầm kiến tự nhiên", quoteMat2: "Trầm tố (tốc kiến)", quoteMat3: "Trầm cảnh nguyên khối", quoteMat4: "Để nghệ nhân tư vấn", quoteNotePh: "Câu chuyện, dịp tặng, ngân sách dự kiến…", sendRequest: "Gửi yêu cầu", quoteSuccessTitle: "Đã nhận yêu cầu của bạn", quoteSuccessDesc: "Nghệ nhân Abodhi sẽ liên hệ trong vòng 24 giờ làm việc để trao đổi chi tiết và gửi báo giá.",
      detailBreadcrumb: "Sản phẩm", variantSize: "Chọn kích thước hạt", variantCount: "Chọn số hạt", variantPack: "Chọn quy cách", selectVariant: "Vui lòng chọn phân loại", authenticate: "Cam kết chính hãng", freeConsult: "Tư vấn miễn phí", fixedShip: "Phí vận chuyển cố định 30.000₫", return7: "Đổi trả trong 7 ngày nếu lỗi", trustNote: "Gọi Abodhi để được tư vấn:", inStockLabel: "Còn hàng", outStockLabel: "Tạm hết hàng", selectOption: "Chọn phân loại", qty: "Số lượng", productStory: "Câu chuyện sản phẩm", ingredients: "Thành phần", origin: "Xuất xứ", age: "Độ tuổi trầm", scent: "Hương vị", weight: "Quy cách", reviewsTitle: "Khách hàng nói gì", basedOn: "dựa trên {n} đánh giá", related: "Sản phẩm liên quan", coupon: "Mã ưu đãi", applyCoupon: "Áp dụng", couponInvalid: "Mã không hợp lệ", couponApplied: "Đã áp dụng mã ABODHI10",
      addedToast: "Đã thêm vào giỏ hàng", removedToast: "Đã xoá sản phẩm", cartUpdated: "Đã cập nhật giỏ hàng", orderPlaced: "Đơn hàng đã được tạo", formError: "Vui lòng kiểm tra lại thông tin.", noResult: "Không tìm thấy kết quả.", back: "Quay lại", seeMore: "Xem thêm", seeLess: "Thu gọn", all: "Tất cả", from: "Từ", to: "Đến", or: "hoặc", closeMenu: "Đóng menu", copyright: "© 2026 Trầm Hương Abodhi · abodhi.com",
      viewProduct: "Xem sản phẩm", notFoundTitle: "Không tìm thấy trang", notFoundDesc: "Trang bạn tìm có thể đã được di chuyển hoặc không còn tồn tại. Hãy trở về bộ sưu tập Abodhi.", backToShop: "Quay lại cửa hàng", discount: "Giảm giá", lineTotal: "Thành tiền", transferNote: "Nội dung chuyển khoản", statusConfirmed: "Đã xác nhận", statusPacking: "Đang đóng gói", statusShipping: "Đang giao hàng", statusDelivered: "Đã giao", copyLink: "Sao chép liên kết", linkCopied: "Đã sao chép liên kết", minPrice: "Giá thấp nhất", maxPrice: "Giá cao nhất", orderItems: "Sản phẩm trong đơn", contactZalo: "Nhắn Zalo", callHotline: "Gọi hotline", viewDetail: "Xem chi tiết", chooseVariant: "Vui lòng chọn phân loại", addSuccess: "Đã thêm vào giỏ hàng", searchFor: "Kết quả cho", noShipping: "Chưa có phí vận chuyển", couponHint: "Nhập ABODHI10 để nhận ưu đãi 10%", bankQrNote: "Quét mã để chuyển khoản", bankMemo: "Nội dung", orderNote: "Ghi chú đơn hàng", support: "Hỗ trợ", freeConsultShort: "Tư vấn miễn phí", viewAllArticles: "Xem tất cả bài viết", favorite: "Yêu thích", wishlist: "Danh sách yêu thích"
    },
    en: {
      skip: "Skip to content", mainNav: "Main navigation", brandTagline: "Natural agarwood · Serenity · From the heart",
      announceShip: "Complimentary consultation · Fixed nationwide shipping 30,000₫", announceNatural: "100% natural agarwood · Traceable origin",
      navHome: "Home", navAbout: "About", navShop: "Shop", navNews: "Journal", navContact: "Contact",
      megaEyebrow: "The Abodhi Collection", megaTitle: "The essence of Vietnamese agarwood", megaDesc: "From handcrafted incense to sinking-grade jewellery — every piece is an invitation back to stillness.",
      viewAll: "View all products", search: "Search", trackOrder: "Track your order", trackOrderShort: "Track order", openCart: "Open cart", openMenu: "Open menu", close: "Close",
      searchEyebrow: "Search Abodhi", searchPlaceholder: "Search incense, bracelets, oils…", searchPopular: "Popular searches", searchEmpty: "No matching products found. Try another keyword.", searchProducts: "Products", searchArticles: "Journal", searchViewAll: "View all results",
      footerIntro: "From old agarwood forests in Quang Nam, Khanh Hoa and Gia Lai, Abodhi preserves the essence of the land in every handcrafted piece — so each moment may feel still and complete.",
      footerCategories: "Product categories", footerPolicies: "Customer care", policyShipping: "Shipping policy", policyPayment: "COD & bank transfer", policyReturn: "Returns & care", policyPrivacy: "Privacy policy", footerCraft: "Our craft story", footerContact: "Contact Abodhi",
      hours: "08:00 – 21:00 · Monday – Sunday", legalLabel: "Operating entity", legalNote: "Images are for illustration. Product information is updated regularly.",
      chatZalo: "Chat on Zalo", callNow: "Call now · 0912 578 516", yourSelection: "Your selection", cart: "Cart",
      cartEmptyTitle: "Your cart is empty", cartEmptyDesc: "Choose a small gift from Abodhi to begin your ritual.", continueShopping: "Continue exploring", viewCart: "View cart", checkout: "Checkout", subtotal: "Subtotal", shipping: "Shipping", shippingFixed: "Fixed fee", total: "Total", remove: "Remove", quantity: "Quantity", addToCart: "Add to cart", addedToCart: "Added to cart", buyNow: "Buy now", consult: "Consult us", contactForPrice: "Enquire", quoteRequest: "Request a quote", outOfStock: "Out of stock", inStock: "In stock", lowStock: "Only {n} left", bestseller: "Best seller", new: "New", sale: "Offer", limited: "Limited", oneofakind: "One of a kind", bespoke: "Bespoke", quickView: "Quick view",
      filters: "Filters", clearFilters: "Clear filters", category: "Category", allCategories: "All products", priceRange: "Price range", keyword: "Keyword", apply: "Apply", sortBy: "Sort by", sortDefault: "Default", sortPriceAsc: "Price: low to high", sortPriceDesc: "Price: high to low", sortNewest: "Newest", sortBest: "Best selling", showing: "Showing", products: "products", page: "Page", prev: "Previous", next: "Next", noProducts: "No products match your filters.", reset: "Reset", readMore: "Read more", readArticle: "Read article", relatedProducts: "You may also like", description: "Description", usage: "How to use", specifications: "Specifications", reviews: "Reviews", shippingPolicy: "Shipping policy", share: "Share", backToNews: "Back to the Journal", minuteRead: "{n} min read", published: "Published",
      categories: "Categories", tags: "Tags", orderTracking: "Order tracking", orderTrackingDesc: "Enter your order ID and phone number to see the latest status.", orderId: "Order ID", phoneNumber: "Phone number", track: "Track order", trackingEmpty: "No order found. Please check the order ID and phone number.", trackingResult: "Tracking result", status: "Status", orderDate: "Order date", customer: "Customer", paymentMethod: "Payment", cod: "COD – Cash on delivery", bank: "Bank transfer", orderConfirmed: "Your order is confirmed", orderConfirmedDesc: "Thank you for choosing Abodhi. We will contact you shortly to confirm.", orderCode: "Your order ID", saveOrderCode: "Please keep this ID to track your order.", backHome: "Back to home",
      shoppingCart: "Your cart", cartTitle: "Cart & Checkout", cartSubtitle: "A few small gifts, a complete ritual.", checkoutTitle: "Checkout", checkoutSubtitle: "Abodhi delivers nationwide with a fixed shipping fee of 30,000₫.", shippingInfo: "Shipping details", fullName: "Full name", email: "Email", address: "Delivery address", city: "Province / City", note: "Note for Abodhi", orderSummary: "Order summary", placeOrder: "Place order", payment: "Payment method", paymentCod: "Cash on delivery (COD)", paymentCodDesc: "Pay in cash when your order arrives. Safe and convenient.", paymentBank: "Bank transfer", paymentBankDesc: "Transfer in advance; Abodhi confirms and dispatches.", bankInfo: "Bank transfer details", accountName: "Account name", accountNumber: "Account number", bankName: "Bank", copy: "Copy", copied: "Copied", orderSuccess: "Order placed successfully", orderSuccessDesc: "Abodhi has received your order and will contact you shortly.", continueShopping: "Continue shopping", viewOrder: "Track your order", emptyCartTitle: "Your cart is empty", cartEmptyCheckout: "Add a product to your cart before checkout.", required: "This field is required.", invalidPhone: "Please enter a valid phone number.", invalidEmail: "Please enter a valid email.", consentRequired: "Please agree to be contacted by Abodhi.",
      contactTitle: "Contact Abodhi", contactSubtitle: "A question, a bespoke request or simply a hello — we are always glad to listen.", contactFormTitle: "Send a message", subject: "Subject", message: "Message", send: "Send message", contactSuccess: "Message sent", contactSuccessDesc: "Thank you for reaching out. Abodhi will respond within 24 working hours.", hotline: "Hotline", emailLabel: "Email", addressLabel: "Showroom", hoursLabel: "Opening hours", showroom: "Abodhi Showroom", directions: "Get directions", mapTitle: "Abodhi showroom map", faqTitle: "Frequently asked questions",
      heroEyebrow: "Natural agarwood · From Quang Nam", heroTitle1: "Agarwood", heroTitleAccent: "Serenity", heroTitle2: "From the heart", heroSubtitle: "The essence of land and time, gathered over decades and held within every grain. Abodhi brings you pure agarwood, so each moment may become still.", exploreCollection: "Explore the collection", bespokeCta: "Commission a piece", heroNote: "Handcrafted · Traceable origin", heroCardTitle: "20-year wild agarwood", heroCardText: "Selected from old forests of Khanh Hoa", heroScroll: "Scroll to explore",
      trust1: "100% natural agarwood", trust1s: "No synthetic fragrance", trust2: "Handcrafted", trust2s: "By skilled artisans", trust3: "Traceable origin", trust3s: "Quang Nam · Khanh Hoa · Gia Lai", trust4: "Nationwide delivery", trust4s: "Fixed fee 30,000₫",
      catEyebrow: "Eight product lines", catTitle: "A world of agarwood", catSubtitle: "From a thread of smoke in the tea room to the warmth of a bracelet — each line is a way back to yourself.", explore: "Explore",
      bestEyebrow: "Chosen with love", bestTitle: "Best sellers", bestSubtitle: "The pieces Abodhi customers return to most often.", viewAllProducts: "View all products", scrollPrev: "Previous", scrollNext: "Next",
      featuredEyebrow: "Curated collections", featuredTitle: "Agarwood, jewellery & art", featuredSubtitle: "Touch the grain and feel the time that shaped its scent.", tabIncense: "Incense", tabJewelry: "Feng shui jewellery", tabOils: "Oils & waters", tabArt: "Fine agarwood art",
      giftEyebrow: "Gifting & care", giftTitle: "A small gift, a quiet act of care", giftSubtitle: "Agarwood tea, botanical soap and gentle objects for someone you love.", giftCta: "Explore gifts", storyEyebrow: "The Abodhi story", storyTitle: "Serenity is not far away. It begins with one slower breath.", storyText1: "Abodhi was born from a love of Vietnamese agarwood and a wish to protect its slow values. We believe a good product should not only smell beautiful — it must be transparent, sustainable and made with respect.", storyText2: "Each block is carefully selected; each piece is handcrafted by an artisan. From Quang Nam and Khanh Hoa to Gia Lai, we seek the most resin-rich wood to send to you.", storyCta: "Read our story", storyQuote: "Natural agarwood — Serenity — From the heart", statYears: "Years of craft", statCustomers: "Customers", statProducts: "Product lines", statNatural: "Natural",
      testiEyebrow: "Customer reviews", testiTitle: "Notes from those who walk with us", testiSubtitle: "Each review is a small story, sent together with a trace of agarwood.", verified: "Verified Abodhi purchase",
      newsEyebrow: "Journal & knowledge", newsTitle: "Stories from the agarwood forest", newsSubtitle: "Learn about agarwood, feng shui, meditation and the values of slow living.", viewAllNews: "View all articles",
      newsletterTitle: "Receive a letter of stillness", newsletterSubtitle: "Subscribe for new stories, small offers and gentle rituals from Abodhi.", emailPh: "Your email", subscribe: "Subscribe", subscribed: "Thank you for subscribing!", privacyNote: "Abodhi respects your privacy. No spam — only an occasional letter.",
      aboutEyebrow: "About Abodhi", aboutTitle: "We search for the scent of time.", aboutLead: "Abodhi is where Vietnamese agarwood is cared for through knowledge, the artisan's hand and a belief that true beauty always needs time.", aboutStoryEyebrow: "Origins", aboutStoryTitle: "From an old forest to a small ritual in your home.", aboutStory1: "We began with journeys into Quang Nam, Khanh Hoa and Gia Lai, where old aquilaria trees have been forming resin for decades. There we learned that agarwood cannot be hurried.", aboutStory2: "Abodhi exists to bring the finest agarwood into everyday life — not as a distant luxury, but as a way of caring for the mind and the spaces we live in.", aboutCommitEyebrow: "Our commitment", aboutCommitTitle: "Four pillars of Abodhi", processEyebrow: "The craft", processTitle: "From raw wood to a finished piece", processSubtitle: "Each product passes through five careful stages, where time and the artisan's hand work together.", aboutQuote: "We do not sell luxury. We offer a pause.", aboutCta: "Explore the collection",
      shopEyebrow: "The collection", shopTitle: "Abodhi products", shopSubtitle: "Natural agarwood selected for space, body and mind. Filter by what you need.", priceAll: "All prices", priceUnder1: "Under 500K", price500to1: "500K – 1M", price1to3: "1M – 3M", priceOver3: "Over 3M", showFilters: "Filter products", hideFilters: "Hide filters", activeFilters: "Filtering", clearAll: "Clear all", subCategory: "Product line", resultFor: "Results for", sortLabel: "Sort by",
      newsEyebrow2: "The Abodhi Journal", newsTitle2: "Agarwood knowledge", newsSubtitle2: "Slow writing on agarwood, meditation, feng shui and the art of living.", allArticles: "All", knowledgeCat: "Agarwood knowledge", fengshuiCat: "Feng shui & meditation", companyCat: "Abodhi news", featuredArticle: "Featured article", latestArticles: "Latest articles", readTime: "min read", articleBy: "By", relatedArticles: "Related articles",
      contactEyebrow: "Connect", contactTitle2: "Have a question? Let Abodhi listen.", contactLead: "Whether you need product advice, a bespoke piece or simply want to visit our showroom, we are here.", formName: "Full name", formNamePh: "Minh An Nguyen", formPhone: "Phone number", formPhonePh: "0912 345 678", formEmail: "Email", formEmailPh: "you@email.com", formNote: "Note", formSubject: "Subject", formMessage: "Message", formMessagePh: "What would you like to tell Abodhi?", formConsent: "I agree to be contacted by Abodhi.", formSend: "Send message", formSending: "Sending…", formSuccess: "Message sent", formSuccessDesc: "Thank you. Abodhi will respond within 24 working hours.",
      quoteEyebrow: "Bespoke commission", quoteTitle: "Request a quote", quoteIntro: "Tell Abodhi what you are imagining. Our artisan will contact you to refine the piece together.", quoteDimensions: "Desired dimensions / format", quoteDimensionsPh: "e.g. statue 25cm high, 12cm wide…", quoteMaterial: "Material / style", quoteMat1: "Natural wild agarwood", quoteMat2: "Aged agarwood", quoteMat3: "Solid agarwood block", quoteMat4: "Let the artisan advise", quoteNotePh: "Story, occasion, expected budget…", sendRequest: "Send request", quoteSuccessTitle: "Your request has been received", quoteSuccessDesc: "Abodhi's artisan will contact you within 24 working hours to discuss details and provide a quote.",
      detailBreadcrumb: "Products", variantSize: "Choose bead size", variantCount: "Choose bead count", variantPack: "Choose option", selectVariant: "Please select an option", authenticate: "Authenticity promised", freeConsult: "Complimentary advice", fixedShip: "Fixed shipping fee 30,000₫", return7: "Seven-day return for faults", trustNote: "Call Abodhi for advice:", inStockLabel: "In stock", outStockLabel: "Out of stock", selectOption: "Select option", qty: "Quantity", productStory: "The story", ingredients: "Ingredients", origin: "Origin", age: "Resin age", scent: "Scent", weight: "Size", reviewsTitle: "What customers say", basedOn: "based on {n} reviews", related: "Related products", coupon: "Promo code", applyCoupon: "Apply", couponInvalid: "Invalid code", couponApplied: "ABODHI10 applied",
      addedToast: "Added to cart", removedToast: "Item removed", cartUpdated: "Cart updated", orderPlaced: "Order created", formError: "Please check your details.", noResult: "No results found.", back: "Back", seeMore: "See more", seeLess: "See less", all: "All", from: "From", to: "To", or: "or", closeMenu: "Close menu", copyright: "© 2026 Trầm Hương Abodhi · abodhi.com",
      viewProduct: "View product", notFoundTitle: "Page not found", notFoundDesc: "The page you are looking for may have moved or no longer exists. Return to the Abodhi collection.", backToShop: "Back to shop", discount: "Discount", lineTotal: "Line total", transferNote: "Transfer note", statusConfirmed: "Confirmed", statusPacking: "Packing", statusShipping: "Shipping", statusDelivered: "Delivered", copyLink: "Copy link", linkCopied: "Link copied", minPrice: "Minimum price", maxPrice: "Maximum price", orderItems: "Items in this order", contactZalo: "Message on Zalo", callHotline: "Call hotline", viewDetail: "View details", chooseVariant: "Please select an option", addSuccess: "Added to cart", searchFor: "Results for", noShipping: "No shipping fee", couponHint: "Enter ABODHI10 for 10% off", bankQrNote: "Scan to transfer", bankMemo: "Reference", orderNote: "Order note", support: "Support", freeConsultShort: "Complimentary advice", viewAllArticles: "View all articles", favorite: "Favourite", wishlist: "Wishlist"
    }
  };

  return { CATEGORIES, PRODUCTS, ARTICLES, TESTIMONIALS, FAQ, PROCESS, PILLARS, STATS, UI };
})();
