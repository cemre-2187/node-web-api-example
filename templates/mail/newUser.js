module.exports = newUser = (name, activationURL) => {
   const mail = `<!DOCTYPE html>
    <html lang="tr">
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
        <style type="text/css"> a {
           text-decoration: none;
           }
        </style>
        <![endif]-->
    <!--[if gte mso 9]>
        <style>sup {
           font-size: 100% !important;
           }
        </style>
        <![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:500,800&amp;subset=cyrillic" rel="stylesheet">
    <!--<![endif]-->
    <style type="text/css">
       #mshidden {
          mso-hide: all;
          display: none;
          width: 0px;
          height: 0px;
          float: none;
          opacity: 0.0;
          border: 0px solid;
          margin: 0px;
       }
    
       @media only screen and (max-width:600px) {
          .radius {
             border-radius: 0 !important
          }
    
          u+#body {
             width: 100vw !important
          }
    
          p,
          ul li,
          ol li,
          a {
             font-size: 16px !important;
             line-height: 150% !important
          }
    
          h1 {
             font-size: 30px !important;
             text-align: center;
             line-height: 120% !important
          }
    
          h2 {
             font-size: 26px !important;
             text-align: center;
             line-height: 120% !important
          }
    
          h3 {
             font-size: 20px !important;
             text-align: center;
             line-height: 120% !important
          }
    
          h1 a {
             font-size: 30px !important
          }
    
          h2 a {
             font-size: 26px !important
          }
    
          h3 a {
             font-size: 20px !important
          }
    
          .es-menu td a {
             font-size: 16px !important
          }
    
          .es-header-body p,
          .es-header-body ul li,
          .es-header-body ol li,
          .es-header-body a {
             font-size: 16px !important
          }
    
          .es-footer-body p,
          .es-footer-body ul li,
          .es-footer-body ol li,
          .es-footer-body a {
             font-size: 16px !important
          }
    
          .es-infoblock p,
          .es-infoblock ul li,
          .es-infoblock ol li,
          .es-infoblock a {
             font-size: 12px !important
          }
    
          *[class="gmail-fix"] {
             display: none !important
          }
    
          .es-m-txt-c,
          .es-m-txt-c h1,
          .es-m-txt-c h2,
          .es-m-txt-c h3 {
             text-align: center !important
          }
    
          .es-m-txt-r,
          .es-m-txt-r h1,
          .es-m-txt-r h2,
          .es-m-txt-r h3 {
             text-align: right !important
          }
    
          .es-m-txt-l,
          .es-m-txt-l h1,
          .es-m-txt-l h2,
          .es-m-txt-l h3 {
             text-align: left !important
          }
    
          .es-m-txt-r img,
          .es-m-txt-c img,
          .es-m-txt-l img {
             display: inline !important
          }
    
          .es-button-border {
             display: block !important
          }
    
          a.es-button {
             font-size: 16px !important;
             display: block !important;
             border-left-width: 0px !important;
             border-right-width: 0px !important
          }
    
          .es-btn-fw {
             border-width: 10px 0px !important;
             text-align: center !important
          }
    
          .es-adaptive table,
          .es-btn-fw,
          .es-btn-fw-brdr,
          .es-left,
          .es-right {
             width: 100% !important
          }
    
          .es-content table,
          .es-header table,
          .es-footer table,
          .es-content,
          .es-footer,
          .es-header {
             width: 100% !important;
             max-width: 600px !important
          }
    
          .es-adapt-td {
             display: block !important;
             width: 100% !important
          }
    
          .adapt-img {
             width: 100% !important;
             height: auto !important
          }
    
          .es-m-p0 {
             padding: 0px !important
          }
    
          .es-m-p0r {
             padding-right: 0px !important
          }
    
          .es-m-p0l {
             padding-left: 0px !important
          }
    
          .es-m-p0t {
             padding-top: 0px !important
          }
    
          .es-m-p0b {
             padding-bottom: 0 !important
          }
    
          .es-m-p20b {
             padding-bottom: 20px !important
          }
    
          .es-mobile-hidden,
          .es-hidden {
             display: none !important
          }
    
          .es-desk-hidden {
             display: table-row !important;
             width: auto !important;
             overflow: visible !important;
             float: none !important;
             max-height: inherit !important;
             line-height: inherit !important
          }
    
          .es-desk-menu-hidden {
             display: table-cell !important
          }
    
          table.es-table-not-adapt,
          .esd-block-html table {
             width: auto !important
          }
    
          table.es-social {
             display: inline-block !important
          }
    
          table.es-social td {
             display: inline-block !important
          }
       }
    
       #outlook a {
          padding: 0;
       }
    
       .ExternalClass {
          width: 100%;
       }
    
       .ExternalClass,
       .ExternalClass p,
       .ExternalClass span,
       .ExternalClass font,
       .ExternalClass td,
       .ExternalClass div {
          line-height: 100%;
       }
    
       .es-button {
          mso-style-priority: 100 !important;
          text-decoration: none !important;
       }
    
       a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
       }
    
       .es-desk-hidden {
          display: none;
          float: left;
          overflow: hidden;
          width: 0;
          max-height: 0;
          line-height: 0;
          mso-hide: all;
       }
    
       a.es-button:hover {
          border-color: #2CB543 !important;
          background: #2CB543 !important;
       }
    
       a.es-secondary:hover {
          border-color: #ffffff !important;
          background: #ffffff !important;
       }
    </style>
    <div style="background-color:#F7F7F7;">
       <!--[if gte mso 9]>
           <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#F7F7F7"></v:fill>
           </v:background>
           <![endif]-->
       <table cellpadding="0" cellspacing="0" width="100%"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:left top;">
          <tbody>
             <tr style="border-collapse:collapse;">
                <td valign="top" style="padding:0;Margin:0;">
                   <table cellpadding="0" cellspacing="0" class="es-header" align="center" bgcolor="#343434"
                      background="https://pics.esputnik.com/repository/home/17278/common/images/1546957995683.png"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#FFFFFF;background-repeat:no-repeat;background-position:center bottom;background-size:auto 90px;background-image:url(https://pics.esputnik.com/repository/home/17278/common/images/1546957995683.png);">
                      <tbody>
                         <tr style="border-collapse:collapse;">
                            <td align="center" bgcolor="transparent"
                               style="padding:0;Margin:0;background-color:transparent;">
                               <div>
                                  <table bgcolor="transparent" class="es-header-body" align="center" cellpadding="0"
                                     cellspacing="0" width="600"
                                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
                                     <tbody>
                                        <tr style="border-collapse:collapse;">
                                           <td align="left"
                                              style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;">
                                              <table cellpadding="0" cellspacing="0" width="100%"
                                                 style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                 <tbody>
                                                    <tr style="border-collapse:collapse;">
                                                       <td width="560" align="center" valign="top"
                                                          style="padding:0;Margin:0;">
                                                          <table cellpadding="0" cellspacing="0" width="100%"
                                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                             <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                   <td align="center" style="padding:0;Margin:0;">
                                                                      <a target="_blank" href="pintirim.com"
                                                                         style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;font-size:14px;text-decoration:underline;color:#FFFFFF;">
                                                                         <img src="https://pintirim.com/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75" alt=""
                                                                            style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;width:auto;height:45px;">
                                                                      </a>
                                                                   </td>
                                                                </tr>
                                                                <tr style="border-collapse:collapse;">
                                                                   <td align="center" height="51"
                                                                      style="padding:0;Margin:0;"></td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                       </td>
                                                    </tr>
                                                 </tbody>
                                              </table>
                                           </td>
                                        </tr>
                                     </tbody>
                                  </table>
                               </div>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                   <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                      <tbody>
                         <tr style="border-collapse:collapse;">
                            <td align="center" style="padding:0;Margin:0;">
                               <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
                                  <tbody>
                                     <tr style="border-collapse:collapse;">
                                        <td align="left"
                                           style="Margin:0;padding-top:5px;padding-bottom:30px;padding-left:30px;padding-right:30px;">
                                           <table cellpadding="0" cellspacing="0" width="100%"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                              <!---->
                                              <tbody>
                                                 <tr style="border-collapse:collapse;">
                                                    <td width="540" align="center" valign="top" style="padding:0;Margin:0;">
                                                       <table cellpadding="0" cellspacing="0" width="100%"
                                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                          <tbody>
                                                             <tr style="border-collapse:collapse;">
                                                                <td align="center" height="26" style="padding:0;Margin:0;">
                                                                </td>
                                                             </tr>
                                                             <tr
                                                                style="border-collapse:collapse; text-align: center; margin-top: 20px; margin-bottom: 20px;">
                                                                <br />
                                                                <h1
                                                                   style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;font-size:24px;font-style:normal;font-weight:bold;color:#4A4A4A;">
                                                                   Üyelik Aktivasyonu</h1>
                                                                <br /><br />
                                                             </tr>
                                                             <tr style="border-collapse:collapse;">
                                                                <td align="left" class="es-m-txt-c"
                                                                   style="padding:0;Margin:0;padding-bottom:20px;">
                                                                   <h2
                                                                      style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;font-size:24px;font-style:normal;font-weight:bold;color:#4A4A4A;">
                                                                      Merhaba ${name},</h2>
                                                                </td>
                                                             </tr>
                                                             <tr style="border-collapse:collapse;">
                                                                <td align="left" class="es-m-txt-c"
                                                                   style="padding:0;Margin:0;padding-top:10px;padding-bottom:15px;">
                                                                   <p
                                                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;line-height:24px;color:#4A4A4A;">
                                                                      Pintirim sistemine giriş yapabilmek için</p>
                                                                   <p
                                                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;line-height:24px;color:#4A4A4A;">
                                                                      hesabınızı aktifleştirmeniz gerekmektedir.</p>
                                                                   <p
                                                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;line-height:24px;color:#4A4A4A;">
                                                                      <br /></p>
                                                                   <p
                                                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;line-height:24px;color:#4A4A4A;">
                                                                      Lütfen "Aktifleştir" butonuna basınız!</p>
                                                                </td>
                                                             </tr>
                                                             <tr style="border-collapse:collapse;">
                                                                <td align="left" style="padding:0;Margin:0;">
                                                                   <span class="es-button-border"
                                                                      style="border-style:solid;border-color:#7367f0;background:none 0% 0% repeat scroll #7367f0;border-width:0px;display:inline-block;border-radius:30px;width:auto; margin-top: 30px; margin-bottom: 30px;">
                                                                      <a href=${activationURL} class="es-button"
                                                                         style="mso-style-priority:100 !important;text-decoration:none !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;font-size:20px;color:#FFFFFF;border-style:solid;border-color:#7367f0;border-width:15px 30px;display:inline-block;background:#7367f0;border-radius:30px;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;">
                                                                         Aktifleştir
                                                                      </a>
                                                                   </span>
                                                                </td>
                                                             </tr>
                                                             <tr style="border-collapse:collapse;">
                                                                <td align="left" style="padding:0;Margin:0;">
                                                                   Eğer "Aktifleştir" butonu ile yönlendirme çalışmıyor ise
                                                                   aşağıda bulunan web sitesi adresini kopyalayıp,
                                                                   tarayıcınızın adres çubuğuna yapıştırıp, yönlendirme
                                                                   sağlayabilirsiniz. </br> ${activationURL}
                                                                </td>
                                                             </tr>
                                                          </tbody>
                                                       </table>
                                                    </td>
                                                 </tr>
                                              </tbody>
                                           </table>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                   <table cellpadding="0" cellspacing="0" class="es-footer" align="center" bgcolor="#7367f0"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#7367f0;background-repeat:no-repeat;background-position:center top;background-size:auto 90px;background-image:url(./test.svg);">
                      <tbody>
                         <tr style="border-collapse:collapse;">
                            <td align="center" bgcolor="transparent"
                               style="padding:0;Margin:0;background-color:transparent;background-position:left top;">
                               <div>
                                  <table bgcolor="transparent" class="es-footer-body" align="center" cellpadding="0"
                                     cellspacing="0" width="600"
                                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
                                     <tbody>
                                        <tr style="border-collapse:collapse;">
                                           <td align="left"
                                              style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;background-position:center bottom;">
                                              <table cellpadding="0" cellspacing="0" width="100%"
                                                 style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                 <tbody>
                                                    <tr style="border-collapse:collapse;">
                                                       <td width="540" align="center" valign="top"
                                                          style="padding:0;Margin:0;">
                                                          <table cellpadding="0" cellspacing="0" width="100%"
                                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                             <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                   <td align="center" height="95"
                                                                      style="padding:0;Margin:0;"></td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                       </td>
                                                    </tr>
                                                 </tbody>
                                              </table>
                                           </td>
                                        </tr>
                                        <tr style="border-collapse:collapse;">
                                           <td align="left"
                                              style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;">
                                              <table cellpadding="0" cellspacing="0" class="es-left" align="left"
                                                 style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;">
                                                 <tbody>
                                                    <tr style="border-collapse:collapse;">
                                                       <td width="270" class="es-m-p20b" align="left"
                                                          style="padding:0;Margin:0;">
                                                          <table cellpadding="0" cellspacing="0" width="100%"
                                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center bottom;">
                                                             <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                   <td align="left" class="es-m-txt-c"
                                                                      style="padding:0;Margin:0;">
                                                                      <p
                                                                         style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;line-height:24px;color:#FFFFFF;">
                                                                         Pintirim.com
                                                                      </p>
                                                                   </td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                       </td>
                                                    </tr>
                                                 </tbody>
                                              </table>
                                              <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                                 style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;">
                                                 <tbody>
                                                    <tr style="border-collapse:collapse;">
                                                       <td width="270" align="left" style="padding:0;Margin:0;">
                                                          <table cellpadding="0" cellspacing="0" width="100%"
                                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center bottom;">
                                                             <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                   <td style="padding:0;Margin:0;">
                                                                      <table cellpadding="0" cellspacing="0" width="100%"
                                                                         class="es-menu"
                                                                         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                         <tbody>
                                                                            <tr style="border-collapse:collapse;">
                                                                               <td align="right" width="100.00%"
                                                                                  class="es-m-txt-c"
                                                                                  style="Margin:0;padding-left:5px;padding-right:5px;padding-top:0px;padding-bottom:0px;border:0;"
                                                                                  bgcolor="transparent"><a target="_blank"
                                                                                     style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;font-size:16px;text-decoration:none;display:block;color:#FFFFFF;"
                                                                                     href="mailto:info@pintirim.com"><img
                                                                                        src="https://ll.stripocdn.email/content/guids/CABINET_55f8c7f850a2da0484353b31bf893ec2/images/80161542981842805.png"
                                                                                        alt="info@pintirim.com"
                                                                                        title="iinfo@pintirim.com"
                                                                                        align="absmiddle" width="30"
                                                                                        style="display:inline !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:10px;">info@pintirim.com</a>
                                                                               </td>
                                                                            </tr>
                                                                         </tbody>
                                                                      </table>
                                                                   </td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                       </td>
                                                    </tr>
                                                 </tbody>
                                              </table>
                                           </td>
                                        </tr>
                                        <tr style="border-collapse:collapse;">
                                           <td align="left"
                                              style="padding:0;Margin:0;padding-top:15px;padding-bottom:30px;">
                                              <table cellpadding="0" cellspacing="0" width="100%"
                                                 style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                 <tbody>
                                                    <tr style="border-collapse:collapse;">
                                                       <td width="600" align="center" valign="top"
                                                          style="padding:0;Margin:0;">
                                                          <table cellpadding="0" cellspacing="0" width="100%"
                                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                             <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                   <td align="center" class="es-m-txt-c"
                                                                      style="padding:0;Margin:0;">
                                                                      <table cellpadding="0" cellspacing="0"
                                                                         class="es-table-not-adapt es-social"
                                                                         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                         <tbody>
                                                                            <tr style="border-collapse:collapse;">
                                                                            </tr>
                                                                         </tbody>
                                                                      </table>
                                                                   </td>
                                                                </tr>
                                                                <tr style="border-collapse:collapse;">
                                                                   <td align="center"
                                                                      style="padding:0;Margin:0;padding-top:20px;">
                                                                      <p
                                                                         style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:Montserrat, Helvetica, Roboto, Arial, sans-serif;line-height:18px;color:#FFFFFF;">
                                                                         Bu e-posta'yı mobil ve web uygulamalarımıza kayıt
                                                                         olduğunuz için almış bulunmaktasınız<br />Lütfen bu
                                                                         mesaja yanıt vermeyiniz. Bu otomatik bir iletim
                                                                         sistemidir.</p>
                                                                   </td>
                                                                </tr>
                                                             </tbody>
                                                          </table>
                                                       </td>
                                                    </tr>
                                                 </tbody>
                                              </table>
                                           </td>
                                        </tr>
                                     </tbody>
                                  </table>
                               </div>
                               <!--[if gte mso 9]>
                                      </v:textbox>
                                   </v:rect>
                                   <![endif]-->
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </td>
             </tr>
          </tbody>
       </table>
    </div>
    
    </html>`
   return mail;
}