import { NextResponse } from "next/server";
import {query} from '../../../app/lib/db'
export async function POST(req) {
    try {
      const { judulArtikel, kategoriArtikel, isiArtikel, deskripsiArtikel, gambarArtikel, Trivia } = await req.json();
      console.log('ini isi up',judulArtikel, kategoriArtikel, isiArtikel, deskripsiArtikel, gambarArtikel, Trivia)
      const result = await query(
        `INSERT INTO artikel (ArticleTitle, ArticleCategory, ArticleContent, ArticleDescription, ArticleImage, Trivia) VALUES (?, ?, ?, ?, ?, ?)`,
        [judulArtikel, kategoriArtikel, isiArtikel, deskripsiArtikel, gambarArtikel, Trivia ]
      );
      console.log("INSERT RESULT:", result);
      
      const insertId = result.insertId;
      const articleId = "ART" + insertId.toString().padStart(3, "0");
      
      await query(
        `UPDATE artikel SET ArticleID = ? WHERE id = ?`,
        [articleId, insertId]
      );
      
      return NextResponse.json({
        success: true,
        message: 'Artikel berhasil ditambahkan',
        id: articleId,
      });
      
    } catch (e) {
      console.error("ERROR INSERT:", e);
      return NextResponse.json(
        { success: false, message: 'Gagal insert data', error: e.message },
        { status: 500 }
      );
    }
  }
  
