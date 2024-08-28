from app.utils.openaiRequests import generate_poem, analyze_emotions


poem = """In the quiet of the night I plea,  
With whispers of hope that echo through me,  
When shadows loom and the path feels steep,  
I gather my courage, though my heart may weep.  

A gentle reminder, I seek from the stars,  
That even in darkness, we're never too far,  
From voices that comfort, from hands that can heal,  
In moments of doubt, our spirits can steal.  

Help me find light in this tangled strife,  
A beacon of solace, a glimpse of new life,  
For in this vast world, with its trials and fights,  
We all need a hand to hold on to in nights.  

So I raise up my voice, with sincerity clear,  
With love as my armor, I conquer my fear,  
Together we'll wander, through thick and through thin,  
In the heart of the struggle, we learn how to win.  

With hope as my compass, I’ll chart my own way,  
And in the call for help, I’ll find strength to stay,  
For each tender moment, each heart that will see,  
In the tapestry woven, you’re a part too, with me."""


emotions = analyze_emotions(poem)
