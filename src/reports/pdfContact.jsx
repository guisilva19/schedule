import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const pdfContact = (contacts) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Meus Contatos",
      fontSize: 25,
      alignment: "center",
      bold: true,
      margin: [0, 20, 0, 0],
    },
  ];

  const data = contacts.map((contact) => {
    return [
      { text: contact.name, fontSize: 9 },
      { text: contact.email, fontSize: 9 },
      { text: contact.telephone, fontSize: 9 },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [200, 150, 100],
        body: [
          [
            { text: "Name", style: "tableHeader" },
            { text: "Email", style: "tableHeader" },
            { text: "Telefone", style: "tableHeader" },
          ],
          ...data,
        ],
      },
      margin: [30, 50, 20, 50],
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === node.table.body.length ? 2 : 1;
        },
        vLineWidth: function (i, node) {
          return i === 0 || i === node.table.widths.length ? 2 : 1;
        },
        hLineColor: function (i, node) {
          return i === 0 || i === node.table.body.length ? "black" : "gray";
        },
        vLineColor: function (i, node) {
          return i === 0 || i === node.table.widths.length ? "black" : "gray";
        },
      },
    },
  ];

  const baseboard = (pageCurrent, pageCount) => {
    return [
      {
        text: `${pageCurrent} / ${pageCount}`,
        alignment: "right",
        fontSize: 12,
        bold: true,
        margin: [0, 0, 20, 0],
      },
    ];
  };

  const docDef = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer: baseboard,
  };

  pdfMake.createPdf(docDef).download();
};

export default pdfContact;
