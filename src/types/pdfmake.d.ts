/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "pdfmake/build/vfs_fonts" {
  const pdfMakeVfs: {
    vfs: any; pdfMake: { vfs: any } 
};
  export = pdfMakeVfs;
}
declare module "pdfmake/build/pdfmake" {
  const pdfMake: any;
  export = pdfMake;
}

declare module "pdfmake/build/vfs_fonts" {
  const pdfFonts: any;
  export = pdfFonts;
}

