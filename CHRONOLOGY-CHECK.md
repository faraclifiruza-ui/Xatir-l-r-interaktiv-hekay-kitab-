# Chronology correction

Swapped only the two existing scene entries, preserving each entry's title, text, image, alt text and stable ID.

The sequence is now:

8. Canlanan xatirələr
9. Beş il sonra — scene-10.jpg (“5 il sonra”)
10. Səssiz qərar — scene-09.jpg (Rəvan in the cinema)
11. İşığa çıxan hekayə
12. Ölümsüz xatirə

Verified by inspecting both images and asserting that the twelve original scene records are unchanged except for this adjacent swap. No scene is added, removed or duplicated. All other source files were byte-compared against the previous corrected delivery and are unchanged. Matching story text moves with each image. Production TypeScript/Vite build passed. No browser interaction regression run was performed for this data-only change.

Run with npm ci followed by npm run dev in the xatireler folder.
