import React, { useState } from 'react';
import './Styles.css';

const FAQ = () => {
    const [expandedSectionIndex, setExpandedSectionIndex] = useState(null); // Track expanded section
    const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null); // Track expanded question within section
    const [filter, setFilter] = useState(''); // Track search filter

    const sections = [
        {
            title: "General Questions",
            faqs: [
                {
                    question: "What is the average cost of solar panel installation in the Dallas-Fort Worth area?",
                    answer: "The average cost is about $2.20 to $3.04 per watt, depending on system size and location. A 5-kW system can range from $10,000 to $15,200 before incentives. Prices vary with panel quality and installer rates. Dallas tends to be on the lower end compared to other Texas cities. Incentives may further reduce costs."
                },
                {
                    question: "How much can I save on my electricity bill by installing solar panels?",
                    answer: "Solar panels can cover 50-100% of your electricity usage, depending on system size. Dallas-Fort Worth’s sunny weather enhances potential savings. Typical savings range from $60 to $150 per month. Over time, this could mean tens of thousands in reduced utility bills. Savings depend on household energy needs and system size."
                },
                {
                    question: "Are there any state or local incentives for installing solar panels in Texas?",
                    answer: "Texas offers local incentives, such as rebates from utilities like Oncor and Austin Energy. The federal tax credit covers 30% of installation costs. Net metering policies and property tax exemptions are also available in some areas. Local utility rebates vary by provider and availability. Check with your installer for specific DFW incentives."
                },
                {
                    question: "How long does it take to see a return on investment for a solar panel system?",
                    answer: "The average ROI period in Dallas-Fort Worth is 7-10 years. Savings from reduced electricity bills help recover initial costs. Incentives and rebates can speed up ROI. Solar panels typically last 25+ years, so there’s significant time for savings. Your ROI depends on energy costs and available incentives."
                },
                {
                    question: "Do I qualify for the federal solar tax credit?",
                    answer: "Yes, most homeowners qualify for the federal Investment Tax Credit (ITC). The ITC covers 30% of the solar system cost for 2024 installations. To qualify, you must own the system (not lease). It’s available for both primary and secondary residences. Consult a tax advisor to confirm eligibility."
                },
                {
                    question: "Are there solar rebates or financing options available in Dallas-Fort Worth?",
                    answer: "Many DFW utilities, like Oncor, offer solar rebates. Financing options include solar loans, leases, and power purchase agreements (PPAs). Solar loans offer low-interest rates and flexible terms. Rebates and incentives reduce upfront costs. Ask local installers about current financing options and incentives."
                },
                {
                    question: "How does net metering work in Texas, and is it available in my area?",
                    answer: "Net metering lets you sell excess energy back to the grid. Availability varies by utility provider in DFW. When your panels produce more electricity than you use, the surplus is credited to your bill. Check with providers like Oncor and TXU Energy. Not all areas in Texas offer full net metering."
                },
                {
                    question: "Can solar panels increase the value of my home in the DFW area?",
                    answer: "Yes, solar panels often increase home value by up to 4%. Buyers are drawn to lower utility costs and energy independence. Studies show homes with solar sell faster. Texas homes can benefit from energy tax exemptions, further enhancing value. A well-installed system makes your property more appealing."
                },
                {
                    question: "How long do solar panels typically last, and what maintenance do they require?",
                    answer: "Solar panels generally last 25-30 years. Maintenance is minimal, mostly involving occasional cleaning. Annual inspections are recommended to check connections and inverters. Most systems come with a 25-year warranty on panels and a 10-year warranty on inverters. Solar panels are built to withstand Texas weather."
                },
                {
                    question: "What is the typical installation time for a residential solar panel system?",
                    answer: "Most installations take 1-3 days once permits are approved. The overall process, including permitting, can take 4-8 weeks. Installation depends on system size and roof complexity. Local regulations in Dallas-Fort Worth may impact timing. Installers manage permits, scheduling, and final inspections."
                },
                {
                    question: "What is the lifespan of a solar panel inverter, and how often does it need to be replaced?",
                    answer: "Solar inverters typically last 10-15 years, depending on the type and brand. They may need to be replaced once or twice over the life of the solar panel system. Some newer models may last longer, especially if they are micro-inverters, which have a higher lifespan compared to string inverters."
                },
                {
                    question: "Are solar panels affected by weather conditions, like hail or extreme heat?",
                    answer: "Solar panels are designed to withstand harsh weather, including hail and high temperatures. In Dallas-Fort Worth, panels are built to endure local climate conditions, but extreme weather can impact performance slightly. Hail-resistant panels and proper installation can minimize damage risks. Panels perform optimally in sunlight but may have slight efficiency drops in extreme heat."
                },
                {
                    question: "Can I add a battery storage system to my solar panel installation?",
                    answer: "Yes, many homeowners add battery storage to store excess solar energy for use during nighttime or power outages. Adding a battery can increase system costs but improves energy independence. It’s a popular option in areas prone to outages or for those looking to rely less on the grid. Tesla Powerwall and LG Chem are popular choices."
                },
                {
                    question: "How does shade impact the efficiency of solar panels?",
                    answer: "Shade significantly impacts solar panel efficiency, reducing the amount of sunlight that reaches the panels. To mitigate this, installers may design the system to avoid shaded areas or use micro-inverters or power optimizers that help each panel operate independently, minimizing overall losses."
                },
                {
                    question: "Can I install solar panels myself, or do I need a professional?",
                    answer: "While it is technically possible to install solar panels yourself, it’s generally recommended to hire a professional installer. Proper installation is key for safety, maximizing efficiency, and complying with local building codes. Professionals also handle permits and utility hookups, which can be complicated for DIY projects."
                },
                {
                    question: "How do I choose the right solar panel system size for my home?",
                    answer: "The right system size depends on your electricity usage, roof space, and budget. A professional installer will assess your energy needs, analyze your roof’s sun exposure, and recommend a system size that balances efficiency and cost. Most homes in Dallas-Fort Worth use systems between 5 kW to 10 kW."
                },
                {
                    question: "What happens if my solar panels produce more energy than I use?",
                    answer: "Excess energy produced by your solar panels can be sent back to the grid if your utility offers net metering. In return, you receive credits on your electricity bill. If you have battery storage, the surplus can be stored and used when needed, reducing your reliance on grid power during off-peak times."
                },
                {
                    question: "Can I still use solar panels during a power outage?",
                    answer: "Without a battery backup, most grid-tied solar systems will not work during a power outage. This is a safety feature to protect utility workers. However, with a solar battery storage system, you can store energy to use during outages, providing power to essential devices in your home."
                },
                {
                    question: "Do solar panels work in the winter or on cloudy days?",
                    answer: "Yes, solar panels still work during winter and on cloudy days, although their efficiency may be reduced. Panels generate less electricity with less sunlight, but they can still produce energy. Dallas-Fort Worth’s relatively mild winters and sunny climate mean solar panels remain effective year-round."
                },
                {
                    question: "How do I maintain my solar panels, and can they be damaged by debris or dirt?",
                    answer: "Maintenance is minimal and typically involves periodic cleaning to remove debris, dirt, and leaves. Regular checks ensure panels stay efficient. Solar panels are durable, but heavy debris could potentially cause damage. In most cases, rain helps keep them clean, and professional maintenance checks can ensure optimal performance."
                }
            ]
        },
        {
            title: "Residential Clean Energy Credit (Federal Solar Tax Credit)",
            faqs: [
                {
                    question: "What is the Federal Solar Tax Credit?",
                    answer: "The Federal Solar Tax Credit is a tax incentive from the federal government. It allows you to subtract a portion of the cost of your solar system directly from your federal taxes."
                },
                {
                    question: "How much can I get?",
                    answer: "You can claim 30% of the total cost of your solar installation, which includes solar panels, wiring, labor, permits, etc."
                },
                {
                    question: "How does the credit work?",
                    answer: "When you file your federal taxes, this credit reduces the amount of tax you owe. If you owe $8,000 in taxes and have a $6,000 solar credit, you will only need to pay $2,000 in taxes."
                },
                {
                    question: "Can unused credits be rolled over?",
                    answer: "Yes. If your tax credit is larger than what you owe for the year, the unused portion can be carried over to the next year."
                },
                {
                    question: "Who is eligible?",
                    answer: "Homeowners in the U.S. who install solar panels or upgrade existing systems can claim this credit."
                }
            ]
        },
        {
            title: "Oncor Residential Solar Program",
            faqs: [
                {
                    question: "What is the Oncor Residential Solar Program?",
                    answer: "This program offers rebates to homeowners within Oncor’s service area who install solar panels, helping reduce the upfront cost of solar installation."
                },
                {
                    question: "How much can I get?",
                    answer: "You can receive a rebate of up to $9,000, depending on your system's size and efficiency."
                },
                {
                    question: "Who is eligible?",
                    answer: "You must live within Oncor's service area and install a qualifying solar photovoltaic (PV) system."
                },
                {
                    question: "How do I apply?",
                    answer: "After installing your system, apply for the rebate through Oncor."
                }
            ]
        },
        {
            title: "Net Metering Programs",
            faqs: [
                {
                    question: "What is net metering?",
                    answer: "Net metering allows you to send extra energy produced by your solar panels back to the grid, and your utility company will give you credit on your electricity bill for the energy you contribute."
                },
                {
                    question: "How does it work?",
                    answer: "When your solar panels produce more energy than you need, the excess energy is sent to the grid."
                },
                {
                    question: "What are the benefits of net metering?",
                    answer: "Lower electricity bills and energy independence are key benefits."
                },
                {
                    question: "Who offers net metering in DFW?",
                    answer: "Some local utility companies in the Dallas-Fort Worth area offer net metering."
                }
            ]
        },
        {
            title: "Property Tax Exemption for Solar",
            faqs: [
                {
                    question: "What is the property tax exemption for solar?",
                    answer: "This exemption prevents you from paying property taxes on the increased value of your home due to installing solar panels."
                },
                {
                    question: "How does it work?",
                    answer: "The added value from solar installations is not taxed."
                },
                {
                    question: "What are the benefits?",
                    answer: "You save money by avoiding extra property taxes on the value added by your solar system."
                },
                {
                    question: "Who is eligible?",
                    answer: "All Texas homeowners who install solar panels qualify for this state-wide exemption."
                }
            ]
        },
        {
            title: "Contact Information",
            faqs: [
                {
                    question: "Have any more questions?",
                    answer: "Please feel free to contact us at (insert email here)."
                }
            ]
        }
    ];
    

    const toggleSection = (index) => {
        setExpandedSectionIndex(expandedSectionIndex === index ? null : index); // Toggle section display
        setExpandedQuestionIndex(null); // Close any open question when a new section is opened
    };

    const toggleQuestion = (index) => {
        setExpandedQuestionIndex(expandedQuestionIndex === index ? null : index); // Toggle question display
    };

    const filteredSections = sections.map(section => {
        const filteredFaqs = section.faqs.filter(faq =>
            faq.question.toLowerCase().includes(filter) || faq.answer.toLowerCase().includes(filter)
        );
        return { ...section, faqs: filteredFaqs };
    }).filter(section => section.faqs.length > 0);

    return (
        <div className="faq-section">
            <h1 className="MainHeader">Frequently Asked Questions</h1>
            <div className="search-container">
                <input
                    type="text"
                    id="search"
                    placeholder="Search FAQs..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value.toLowerCase())}
                />
                <button id="clear-search" onClick={() => setFilter('')}>Clear</button>
            </div>
            {filteredSections.length === 0 && (
                <div id="no-results">No results found</div>
            )}
            <div className="faq-content">
                {filteredSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="faq-section">
                        <div
                            className="faq-question"
                            onClick={() => toggleSection(sectionIndex)}
                            style={{ cursor: 'pointer', backgroundColor: '#154734', color: 'white', padding: '10px', borderRadius: '10px', margin: '0' }}
                        >
                            {section.title}
                        </div>
                        {expandedSectionIndex === sectionIndex && (
                            <div
                                className="faq-questions"
                                style={{ padding: '15px', border: '1px solid #154734', borderRadius: '10px', backgroundColor: '#ffffff' }}
                            >
                                {section.faqs.map((faq, faqIndex) => (
                                    <div key={faqIndex}>
                                        <div
                                            onClick={() => toggleQuestion(faqIndex)}
                                            style={{ cursor: 'pointer', fontWeight: 'bold', color: 'black', margin: '20px 0' }}
                                        >
                                            {faq.question}
                                        </div>
                                        {expandedQuestionIndex === faqIndex && (
                                            <p style={{ marginLeft: '20px', color: 'black' }}>{faq.answer}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
