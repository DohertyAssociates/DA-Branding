import { FileText } from "lucide-react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DirectionProvider } from "@/components/ui/direction"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Section, Block } from "../section"

export function ChatSection() {
  return (
    <Section id="chat" title="Conversation (AI/chat surfaces)">
      <Card>
        <CardHeader>
          <CardTitle>Message, Bubble, Attachment & Message Scroller</CardTitle>
          <CardDescription>
            For future assistant/chat features — themed to the brand out of the box.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <Block label="Message Scroller with Messages & Bubbles">
            <MessageScrollerProvider>
              <MessageScroller className="h-64 rounded-lg border">
              <MessageScrollerViewport>
                <MessageScrollerContent className="gap-4 p-4">
                  <MessageGroup>
                    <Message>
                      <MessageAvatar className="size-8 text-xs font-semibold">DA</MessageAvatar>
                      <MessageContent>
                        <Bubble variant="muted">
                          <BubbleContent>
                            Hello! I can help you label this tenant. Where shall we start?
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                    <Message align="end">
                      <MessageContent>
                        <Bubble variant="default" align="end">
                          <BubbleContent>Scan the Finance site first, please.</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                    <Message>
                      <MessageAvatar className="size-8 text-xs font-semibold">DA</MessageAvatar>
                      <MessageContent>
                        <Bubble variant="tinted">
                          <BubbleContent>
                            Starting now — 12,840 files found. I'll report back shortly.
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageGroup>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              </MessageScroller>
            </MessageScrollerProvider>
          </Block>

          <Block label="Attachment">
            <Attachment>
              <AttachmentMedia>
                <FileText />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Scan report — Finance.docx</AttachmentTitle>
                <AttachmentDescription>24 KB · Word document</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </Block>

          <Block label="Direction Provider (RTL support)">
            <DirectionProvider dir="rtl">
              <div className="flex items-center gap-3 rounded-lg border p-4" dir="rtl">
                <Button size="sm">حفظ</Button>
                <Button size="sm" variant="outline">
                  إلغاء
                </Button>
                <span className="text-sm text-muted-foreground">
                  Components render right-to-left inside DirectionProvider.
                </span>
              </div>
            </DirectionProvider>
          </Block>
        </CardContent>
      </Card>
    </Section>
  )
}
